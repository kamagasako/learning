-module(new_name_server).
-export([init/0, add/2, all_names/0, delete/1, whereis/1, handle/2]).
%-import(server3, [rpc/2]).
-import(server4, [rpc/2]).

add(Name, Place) -> rpc(name_server, {add, Name, Place}).
all_names() -> rpc(name_server, allNames).
delete(Name) -> rpc(name_server, {delete, Name}).
whereis(Name) -> rpc(name_server, {whereis, Name}).

init() -> dict:new().

handle({add, Name, Place}, Dict) -> {ok, dict:store(Name, Place, Dict)};
handle(allNames, Dict) -> {dict:fetch_keys(Dict), Dict};
handle({delete, Name}, Dict) -> {ok, dict:erase(Name, Dict)};
handle({whereis, Name}, Dict) -> {dict:find(Name, Dict), Dict}.
