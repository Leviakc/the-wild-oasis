import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_layout/account/')({
  component: () => <div>Hello /_layout/account/!</div>
})