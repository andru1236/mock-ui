import React from 'react'
import { Header } from 'semantic-ui-react'
import styled from 'styled-components'

interface HeadProps {
    section?: string;
}

const Wrapper = styled.div`
    margin-top: 2rem;
    margin-bottom: 2rem;
`

const HeaderMain = (props: HeadProps) => (
  <Wrapper>
      <Header size={ 'huge' } as={ 'h1' } textAlign={ 'center' }>
          System Mock { !props.section ? '' : ` / ${ props.section }` }
      </Header>
  </Wrapper>
);

export default HeaderMain;