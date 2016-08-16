-module(fac1).
-export([main/1]).

main([A]) ->
    I = list_to_integer(atom_to_list(A)),
    F = fac:fac(I),
    io:format("factorial ~w = ~w~n", [I, F]),
    init:stop().
