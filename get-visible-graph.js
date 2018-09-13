function getVisibleGraph() {
  var elements = currentScene.nodes.map(model => model.entity.attrs.attributes)
  var connections = currentScene.edges.map(model => model.entity.attrs.attributes)

  return {
    'elements': els,
    'connections': connections
  }
}
