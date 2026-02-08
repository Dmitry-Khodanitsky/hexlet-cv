import { Button } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'

interface IProps {
  onAction: () => void
  children: React.ReactNode
}
export const StartLearningButton: React.FC<IProps> = ({
  children,
  onAction,
}) => {
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
