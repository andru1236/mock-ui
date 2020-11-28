import React from 'react'
import { Header } from 'semantic-ui-react'

interface HeadProps {
    section?: string;
}

const MainHeader = (props: HeadProps) => (
  <div>
      <Header size={ 'huge' } as={ 'h1' } textAlign={ 'center' }>
          Api mock { !props.section ? '' : ` / ${ props.section }` }
      </Header>
  </div>
);

export default MainHeader;