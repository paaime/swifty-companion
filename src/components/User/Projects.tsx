import { ICursus, IProject, IUser } from 'src/types/type'
import { timeSince } from 'src/utils/time'
import styled from 'styled-components/native'
import { AntDesign } from '@expo/vector-icons'

const Project = ({ project }: { project: IProject }) => {
  return (
    <S.Card>
      <S.Wrapper>
        <S.CardTitle>{project.project.name}</S.CardTitle>
        <S.CardDate>{timeSince(project.updated_at)} ago</S.CardDate>
      </S.Wrapper>
      {project['validated?'] == null ? (
        <S.CardScoreWrapper>
          <S.CardIcon name="clockcircleo" size={24} color="grey" />
        </S.CardScoreWrapper>
      ) : project['validated?'] ? (
        <S.CardScoreWrapper>
          <S.CardIcon name="check" size={24} color="green" />
          <S.CardScore style={{ color: 'green' }}>{project.final_mark}</S.CardScore>
        </S.CardScoreWrapper>
      ) : (
        <S.CardScoreWrapper>
          <S.CardIcon name="close" size={24} color="red" />
          <S.CardScore style={{ color: 'red' }}>{project.final_mark}</S.CardScore>
        </S.CardScoreWrapper>
      )}
    </S.Card>
  )
}

export default function Projects({ user, cursus }: { user: IUser; cursus: ICursus }) {
  return (
    <S.Content>
      <S.Title>Projects</S.Title>
      {!user?.projects_users?.length ? (
        <S.Description>No projects found</S.Description>
      ) : (
        <S.Description>Projects that the user has worked on</S.Description>
      )}
      {user?.projects_users
        ?.filter((project) => project.cursus_ids.includes(cursus.cursus.id))
        .map((project) => <Project key={project.id} project={project} />)}
    </S.Content>
  )
}

const S = {
  Content: styled.View`
    flex: 1;
    flex-direction: column;
  `,
  Title: styled.Text`
    color: ${(p) => p.theme.primary};
    font-family: Urbanist_Bold;
    font-weight: 900;
    font-size: ${(p) => p.theme.size(28, 'px')};
    margin-bottom: ${(p) => p.theme.size(10, 'px')};
  `,
  Description: styled.Text`
    color: ${(p) => p.theme.primary};
    font-family: Urbanist;
    font-weight: 600;
    font-size: ${(p) => p.theme.size(15, 'px')};
    margin-bottom: ${(p) => p.theme.size(15, 'px')};
  `,
  Card: styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #232627;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 10px;
  `,
  Wrapper: styled.View`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    width: 90%;
  `,
  CardTitle: styled.Text`
    color: white;
    font-family: Urbanist_Semi;
    font-size: ${(p) => p.theme.size(16, 'px')};
    margin-right: ${(p) => p.theme.size(10, 'px')};
  `,
  CardDate: styled.Text`
    color: white;
    font-family: Urbanist;
    font-weight: 600;
    font-size: ${(p) => p.theme.size(14, 'px')};
  `,
  CardDescription: styled.Text`
    color: white;
    font-family: Urbanist;
    font-size: ${(p) => p.theme.size(15, 'px')};
    margin-bottom: ${(p) => p.theme.size(15, 'px')};
  `,
  CardScoreWrapper: styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: auto;
  `,
  CardIcon: styled(AntDesign)``,
  CardScore: styled.Text`
    font-family: Urbanist_Bold;
    font-size: ${(p) => p.theme.size(15, 'px')};
  `
}
