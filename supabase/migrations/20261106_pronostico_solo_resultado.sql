-- Un pronóstico puede ser marcador exacto (goles_*) o solo resultado:
-- L = gana local, E = empate, V = gana visitante.
alter table public.pronosticos
  alter column goles_local drop not null,
  alter column goles_visitante drop not null,
  add column resultado text check (resultado in ('L','E','V'));

update public.pronosticos
set resultado = case when goles_local > goles_visitante then 'L' when goles_local < goles_visitante then 'V' else 'E' end;

alter table public.pronosticos alter column resultado set not null;

alter table public.pronosticos add constraint pronosticos_exacto_o_resultado check (
  (goles_local is not null and goles_visitante is not null)
  or (goles_local is null and goles_visitante is null)
);

-- Marcador exacto: ahora también fija el resultado.
create or replace function public.guardar_pronostico(p_jugador text, p_pin text, p_partido bigint, p_gl integer, p_gv integer)
returns void language plpgsql security definer set search_path to '' as $function$
declare v_inicio timestamptz;
begin
  if not public.verificar_pin(p_jugador, p_pin) then
    raise exception 'PIN incorrecto' using errcode = '28000';
  end if;
  select inicio into v_inicio from public.partidos where id = p_partido;
  if not found then
    raise exception 'El partido no existe';
  end if;
  if now() >= v_inicio then
    raise exception 'Pronóstico cerrado: el partido ya empezó' using errcode = 'P0001';
  end if;
  if p_gl is null or p_gv is null or p_gl < 0 or p_gv < 0 or p_gl > 99 or p_gv > 99 then
    raise exception 'Marcador inválido';
  end if;
  insert into public.pronosticos (partido_id, jugador_id, goles_local, goles_visitante, resultado, actualizado_en)
  values (p_partido, p_jugador, p_gl, p_gv,
          case when p_gl > p_gv then 'L' when p_gl < p_gv then 'V' else 'E' end, now())
  on conflict (partido_id, jugador_id)
  do update set goles_local = excluded.goles_local,
                goles_visitante = excluded.goles_visitante,
                resultado = excluded.resultado,
                actualizado_en = now();
end $function$;

-- Solo resultado: gana local (L), empate (E) o gana visitante (V).
create or replace function public.guardar_pronostico_resultado(p_jugador text, p_pin text, p_partido bigint, p_resultado text)
returns void language plpgsql security definer set search_path to '' as $function$
declare v_inicio timestamptz;
begin
  if not public.verificar_pin(p_jugador, p_pin) then
    raise exception 'PIN incorrecto' using errcode = '28000';
  end if;
  select inicio into v_inicio from public.partidos where id = p_partido;
  if not found then
    raise exception 'El partido no existe';
  end if;
  if now() >= v_inicio then
    raise exception 'Pronóstico cerrado: el partido ya empezó' using errcode = 'P0001';
  end if;
  if p_resultado is null or p_resultado not in ('L','E','V') then
    raise exception 'Resultado inválido';
  end if;
  insert into public.pronosticos (partido_id, jugador_id, goles_local, goles_visitante, resultado, actualizado_en)
  values (p_partido, p_jugador, null, null, p_resultado, now())
  on conflict (partido_id, jugador_id)
  do update set goles_local = null,
                goles_visitante = null,
                resultado = excluded.resultado,
                actualizado_en = now();
end $function$;

grant execute on function public.guardar_pronostico_resultado(text, text, bigint, text) to anon, authenticated;
