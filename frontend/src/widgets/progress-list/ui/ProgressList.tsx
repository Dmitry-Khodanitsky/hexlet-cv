import { SimpleGrid, Container, Button, Group, Pagination } from '@mantine/core'
import {
  IconBook,
  IconShoppingCart,
  IconPlayerPlayFilled,
} from '@tabler/icons-react'
import { useMemo } from 'react'
import { usePage, router } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { EmptyPlaceholder, PageHeader } from '@shared/ui'
import { LearningProgressCard } from '@entities/learning-progress'
import { StartLearningButton } from '@features/learning-progress-actions'
import type { IProgressResponse } from '@widgets/progress-list/types'
import { type PageProps } from '@inertiajs/core'

export const ProgressList: React.FC = () => {
  const { props } = usePage<PageProps & IProgressResponse>()
  const { t } = useTranslation()

  const { progress: learningPrograms, pagination } = props

  // сортируем массив с учебными программами по дате последней активности.
  const sortedPrograms = useMemo(() => {
    return [...learningPrograms].sort((a, b) => {
      const lastActivityDateA = new Date(a.lastActivityAt).getTime()
      const lastActivityDateB = new Date(b.lastActivityAt).getTime()

      return lastActivityDateB - lastActivityDateA
    })
  }, [learningPrograms])

  // Функция для смены страницы, так как список программ приходит частями по 10
  const handlePageChange = (page: number) => {
    router.get(
      '/account/my-progress',

      { page: page - 1 },
      {
        preserveScroll: true,
      },
    )
  }

  if (!learningPrograms.length)
    return (
      <EmptyPlaceholder
        title={t('emptyPlaceholders.noPurchasesTitle')}
        icon={IconShoppingCart}
        buttonLink="https://hexlet.io/courses"
        buttonLabel={t('buttonsLabels.goToCatalog')}
      />
    )

  return (
    <Container fluid>
      <PageHeader
        icon={<IconBook />}
        title={t('accountPage.progress.title')}
        actionButton={
          <Button
            variant="outline"
            leftSection={<IconPlayerPlayFilled size={12} />}
          >
            {t('buttonsLabels.continue')}
          </Button>
        }
      />

      {/* основной контент */}
      <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="md">
        {sortedPrograms.map((program) => {
          return (
            <LearningProgressCard
              key={program.id}
              program={program}
              action={
                <StartLearningButton onAction={() => console.log('click')}>
                  {t('buttonsLabels.open')}
                </StartLearningButton>
              }
            />
          )
        })}
      </SimpleGrid>
      {/* Блок пагинации: показываем только если страниц больше одной */}
      {pagination.totalPages > 1 && (
        <Group justify="center" mt="xl" pb="xl">
          <Pagination
            total={pagination.totalPages}
            value={pagination.currentPage + 1}
            onChange={handlePageChange}
            radius="md"
          />
        </Group>
      )}
    </Container>
  )
}
