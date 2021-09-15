import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { useRecoilValue } from 'recoil'
import ClientSideLink from 'src/components/atoms/ClientSideLink'
import { useMeQuery } from 'src/graphql/generated/types-and-hooks'
import {
  SOBOK_COLOR,
  SOBOK_ACHROMATIC_COLOR,
  SOBOK_TEXT_COLOR,
  NAVIGATION_HEIGHT,
} from 'src/utils/constants'
import { currentUser } from 'src/models/recoil'
import { TABLET_MIN_WIDTH } from 'src/utils/constants'
import styled from 'styled-components'
import { HeartIcon, HomeIcon, NewsIcon, PersonIcon, TrendIcon } from 'src/components/atoms/SVG'

const Padding = styled.div`
  padding: ${NAVIGATION_HEIGHT};
`

const FixedNavigation = styled.nav`
  position: fixed;
  bottom: 0;
  z-index: 1;

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  align-items: center;

  width: 100%;
  max-width: ${TABLET_MIN_WIDTH};
  height: ${NAVIGATION_HEIGHT};
  box-shadow: 0 -3px 3px 0 rgba(0, 0, 0, 0.06);
  background-color: #fff;
`

const SClientSideLink = styled(ClientSideLink)<{ color: string }>`
  color: ${(p) => p.color};

  :hover {
    color: ${SOBOK_TEXT_COLOR};
  }

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`

const IconWrapper = styled.div`
  width: 1.5rem;
  height: 1.5rem;
`

type Props = {
  children: ReactNode
}

export default function NavigationLayout({ children }: Props) {
  const { uniqueName: localUserUniqueName } = useRecoilValue(currentUser)

  const { data, loading } = useMeQuery({ skip: Boolean(localUserUniqueName) })

  const userUniqueName = data?.me?.uniqueName

  const { asPath } = useRouter()

  const storeBucketUrl = `/@${(localUserUniqueName || userUniqueName) ?? ''}/store-buckets`
  const menuBucketUrl = `/@${(localUserUniqueName || userUniqueName) ?? ''}/menu-buckets`
  const myPageUrl = `/@${(localUserUniqueName || userUniqueName) ?? ''}`

  const doesNewsSelected = asPath.startsWith('/news')
  const doesTrendSelected = asPath.startsWith('/trends')
  const doesHomeSelected = asPath === '/'
  const doesHeartSelected = asPath === storeBucketUrl || asPath === menuBucketUrl
  const doesPersonSelected = asPath === myPageUrl

  return (
    <>
      {children}
      <Padding />
      <FixedNavigation>
        <SClientSideLink
          color={doesNewsSelected ? SOBOK_TEXT_COLOR : SOBOK_ACHROMATIC_COLOR}
          href="/news"
        >
          <IconWrapper>
            <NewsIcon color={doesNewsSelected ? SOBOK_COLOR : SOBOK_ACHROMATIC_COLOR} />
          </IconWrapper>
          <div>소식</div>
        </SClientSideLink>

        <SClientSideLink
          color={doesTrendSelected ? SOBOK_TEXT_COLOR : SOBOK_ACHROMATIC_COLOR}
          href="/trends"
        >
          <IconWrapper>
            <TrendIcon color={doesTrendSelected ? SOBOK_COLOR : SOBOK_ACHROMATIC_COLOR} />
          </IconWrapper>
          <div>트렌드</div>
        </SClientSideLink>

        <SClientSideLink
          color={doesHomeSelected ? SOBOK_TEXT_COLOR : SOBOK_ACHROMATIC_COLOR}
          href="/"
        >
          <IconWrapper>
            <HomeIcon color={doesHomeSelected ? SOBOK_COLOR : SOBOK_ACHROMATIC_COLOR} />
          </IconWrapper>
          <div>홈</div>
        </SClientSideLink>

        <SClientSideLink
          color={doesHeartSelected ? SOBOK_TEXT_COLOR : SOBOK_ACHROMATIC_COLOR}
          href={storeBucketUrl}
        >
          <IconWrapper>
            <HeartIcon color={doesHeartSelected ? SOBOK_COLOR : SOBOK_ACHROMATIC_COLOR} />
          </IconWrapper>
          <div>버킷 {loading && 'loading...'}</div>
        </SClientSideLink>

        <SClientSideLink
          color={doesPersonSelected ? SOBOK_TEXT_COLOR : SOBOK_ACHROMATIC_COLOR}
          href={myPageUrl}
        >
          <IconWrapper>
            <PersonIcon color={doesPersonSelected ? SOBOK_COLOR : SOBOK_ACHROMATIC_COLOR} />
          </IconWrapper>
          <div>MY {loading && 'loading...'}</div>
        </SClientSideLink>
      </FixedNavigation>
    </>
  )
}
