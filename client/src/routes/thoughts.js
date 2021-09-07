export default [
  {
    name: 'create_item',
    path: 'create',
    component: () => import('@/views/thoughts/Create')
  },
  {
    name: 'read_item',
    path: 'read/:thought_id',
    component: () => import('@/views/thoughts/Read'),
    props: true
  },
  {
    name: 'edit_item',
    path: 'edit/:thought_id',
    component: () => import('@/views/thoughts/Edit'),
    props: true
  },
]
