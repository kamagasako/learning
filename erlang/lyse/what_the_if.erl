-module(what_the_if).
-compile(export_all).

heh_fine() ->
    if 1 =:= 1 ->
            works
    end,
    if 1 =:= 2; 1 =:= 1 ->
            works
    end,
    if 1 =:= 2, 1 =:= 1 ->
            fails
    end.

oh_god(N) ->
    if N =:= 2 ->
            might_succeed;
       true ->
            always_does
    end.

help_me(Animal) ->
    Talk = if Animal == cat -> "meow";
              Animal == beef -> "mooo";
              Animal == dog -> "bark";
              Animal == tree -> "bark";
              true -> "hogefuga"
           end,
    {Animal, "says " ++ Talk ++ "!"}.

%%hoge(cat) -> "meow";
%%hoge(beef) -> "mooo";
%%hoge(dog) -> "bark";
%%hoge(tree) -> "bark";
%%hoge(_) -> "hogefuga".
%%help_me_2(Animal) ->
%%    {Animal, "says " ++ hoge(Animal) ++ "!"}.

prepend(X, []) ->
    [X];
prepend(X, Set) ->
    case lists:member(X, Set) of
        true -> Set;
        false -> [X | Set]
    end.

beach(Temperature) ->
    case Temperature of
        {celsius, N} when N >= 20, N =< 45 -> 'favorable'; % single quote -> atom, not string
        {kelvin, N} when N >= 293, N =< 318 -> 'scientifically favorable';
        {fahrenheight, N} when N >= 68, N =< 113 -> 'favorable in the US';
        _ -> 'avoid beach'
    end.

beachf({celsius, N}) when N >= 20, N =< 45 -> 'favorable';
beachf({kelvin, N}) when N >= 293, N =< 318 -> 'scientifically favorable';
beachf({fahrenheight, N}) when N >= 68, N =< 113 -> 'favorable in the US';
beachf(_) -> 'avoid beach'.
