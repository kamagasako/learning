{application, sellaprime,
 [{description, "the prime number server"},
  {vsn, "1.0"},
  {modules, [sellaprime_app, sellaprime_supervisor, area_server,
             prime_server, lib_primes, my_alarm_handler]},
  {registered, [area_server, prime_server, my_alarm_handler]},
  {applications, [kernel, stdlib]},
  {mod, {sellaprime_app, []}},
  {start_phases, []}
 ]}.
