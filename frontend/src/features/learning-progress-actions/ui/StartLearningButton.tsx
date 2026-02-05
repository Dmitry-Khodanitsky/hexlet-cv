import { Button } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'

type TProps = {
  onAction: () => void
  children: React.ReactNode
}
export const StartLearningButton: React.FC<TProps> = (props) => {
  const { children, onAction } = props
  return (
    <Button
      onClick={onAction}
      variant="subtle"
      rightSection={<IconChevronRight size={14} />}
    >
      {children}
    </Button>
  )
}
