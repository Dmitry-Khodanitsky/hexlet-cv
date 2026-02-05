import { ThemeIcon, Progress, Group, Stack, Text, Card } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { useRelativeDate, getDaysDiff } from '@shared/lib'
import type { IProgress } from '../index'

interface LearningProgressCardProps {
  program: IProgress
  action: React.ReactNode
}

export const LearningProgressCard: React.FC<LearningProgressCardProps> = (
  props,
) => {
  const { program, action } = props
  const { t } = useTranslation()
  const getLastActivityText = useRelativeDate()
  const lastActivityText = getLastActivityText(
    program.lastActivityAt,
    getDaysDiff,
  )
  return (
    <Card
      shadow="sm"
      padding="md"
      radius="md"
      withBorder
      flex={1}
      display="flex"
      style={{ flexDirection: 'column' }}
    >
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon
          size="lg"
          variant="filled"
          radius="md"
          style={{ flexShrink: 0 }}
        >
          <Text fw="bold">{program.programTitle[0]}</Text>
        </ThemeIcon>

        <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
          <Text fw="bold" size="lg" lineClamp={2} title={program.programTitle}>
            {program.programTitle}
          </Text>

          <Group gap={4}>
            <Text size="xs" fw={500} c={program.isCompleted ? 'green' : 'blue'}>
              {program.isCompleted
                ? t('accountPage.progress.status.done')
                : t('accountPage.progress.status.inProgress')}
            </Text>
            <Text size="xs" c="dimmed" span>
              ·
            </Text>
            <Text size="xs" c="dimmed" truncate>
              {lastActivityText}
            </Text>
          </Group>
        </Stack>
      </Group>

      <Stack mt="auto" pt="md">
        <Progress
          value={program.progressPercentage}
          mt="md"
          size="sm"
          radius="xl"
        />
        <Group justify="space-between" align="center">
          <Text size="sm" fw={500} c="dimmed">
            {program.completedLessons} / {program.totalLessons}
          </Text>
          {action}
        </Group>
      </Stack>
    </Card>
  )
}
