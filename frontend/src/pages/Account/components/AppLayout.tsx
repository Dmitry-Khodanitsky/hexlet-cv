import { Header } from '@widgets/Header'
import { Navbar } from './Navbar'
import { SectionLayout } from './SectionLayout'
import { Flex } from '@mantine/core'
import { Footer } from '@widgets/Footer'
import React from 'react'

type TProps = {
  children: React.ReactNode
}

export const AppLayout: React.FC<TProps> = (props) => {
  const { children } = props

  return (
    <Flex direction="column" mih="100vh">
      <Header />
      {/* на большом дисплее 4к контент размазывается, поэтому ограничили ширину 1600px*/}
      <Flex w="100%" flex={1} maw={1600} align="stretch" mx="auto">
        <Navbar />
        <SectionLayout>{children}</SectionLayout>
      </Flex>
      <Footer />
    </Flex>
  )
}
