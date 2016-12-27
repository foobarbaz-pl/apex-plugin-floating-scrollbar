function add_floating_scrollbar(p_dynamic_action in apex_plugin.t_dynamic_action,
                                p_plugin         in apex_plugin.t_plugin)
  return apex_plugin.t_dynamic_action_render_result is
  l_result apex_plugin.t_dynamic_action_render_result;
begin
  -- Enable debug mode
  if apex_application.g_debug then
    apex_plugin_util.debug_dynamic_action(p_plugin         => p_plugin,
                                          p_dynamic_action => p_dynamic_action);
  end if;

  l_result.javascript_function := 'addFloatingScrollbar';
  return l_result;
end add_floating_scrollbar;
