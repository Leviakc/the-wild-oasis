import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/_layout/users/')({
  component: () => <div>Hello /_layout/users/!</div>
})