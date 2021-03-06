-module(tree).

-export([empty/0, insert/3, lookup/2]).

%% node: {node, {Key, Value, Smaller, Larger}}

empty() -> {node, 'nil'}.

insert(Key, Value, {node, 'nil'}) ->
    {node, {Key, Value, {node, 'nil'}, {node, 'nil'}}};
insert(NewKey, NewVal, {node, {Key, Val, Smaller, Larger}}) when NewKey < Key ->
    {node, {Key, Val, insert(NewKey, NewVal, Smaller), Larger}};
insert(NewKey, NewVal, {node, {Key, Val, Smaller, Larger}}) when NewKey > Key ->
    {node, {Key, Val, Smaller, insert(NewKey, NewVal, Larger)}};
insert(Key, Val, {node, {Key, _, Smaller, Larger}}) ->
    {node, {Key, Val, Smaller, Larger}}.

lookup(_, {node, 'nil'}) -> 'undefined';
lookup(Key, {node, {Key, Val, _, _}}) -> {ok, Val}; % Key == NodeKey
lookup(Key, {node, {NodeKey, _, Smaller, _}}) when Key < NodeKey -> lookup(Key, Smaller);
lookup(Key, {node, {_, _, _, Larger}}) -> lookup(Key, Larger). % when Key > NodeKey

%% chapter 9
%%has_value(_, {node, 'nil'}) -> false;
%%has_value(Val, {node, {_, Val, _, _}}) -> true;
%%has_value(Val, {node, {_, _, Left, Right}}) ->
%%    case has_value(Val, Left) of
%%        true -> true;
%%        false -> has_value(Val, Right)
%%    end.
has_value(Val, Tree) ->
    try has_value1(Val, Tree) of
        false -> false
    catch
        true -> true
    end.
has_value1(_, {node, 'nil'}) -> false;
has_value1(Val, {node, {_, Val, _, _}}) -> true;
has_value1(Val, {node, {_, _, Left, Right}}) ->
    has_value1(Val, Left),
    has_value1(Val, Right).
