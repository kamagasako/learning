-module(guards).
-compile(export_all). % replace -export() for sanity's sake.

right_age(X) when X >= 16 andalso X =< 104 ->
    true;
right_age(_) ->
    false.

wrong_age(X) when X < 16 orelse X > 104 ->
    true;
wrong_age(_) ->
    false.
