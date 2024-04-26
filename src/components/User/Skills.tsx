import { useEffect, useState } from 'react'
import { ICursus } from 'src/types/type'
import styled from 'styled-components/native'
import { VictoryGroup, VictoryArea, VictoryChart, VictoryPolarAxis } from 'victory-native'
import LevelBar from '../LevelBar'
import { View } from 'react-native'

interface ISkill {
  id: number
  name: string
  level: number
}

export default function Skills({ cursus }: { cursus: ICursus }) {
  if (!cursus)
    return (
      <S.Content>
        <S.Title>Skills</S.Title>
        <S.Description>No skills found</S.Description>
      </S.Content>
    )

  const [skills, setSkills] = useState<
    | {
        x: string
        y: number
      }[]
    | null
  >()

  const processData = (data: ISkill[]) => {
    return data.map((skill) => {
      return { x: skill.name, y: skill.level / 21 }
    })
  }

  useEffect(() => {
    setSkills(processData(cursus.skills))
  }, [cursus])

  return (
    <S.Content>
      <S.Title>Skills</S.Title>
      {cursus.skills.length > 0 ? (
        <>
          <S.Description>Level of proficiency in each skill</S.Description>
          <View style={{ marginLeft: -20 }}>
            <VictoryChart polar>
              <VictoryGroup colorScale={['cyan']} style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}>
                <VictoryArea data={skills as undefined} />
              </VictoryGroup>
              {skills &&
                skills.map((key: { x: string; y: number }, i: number) => {
                  return (
                    <VictoryPolarAxis
                      key={i}
                      dependentAxis
                      style={{
                        axisLabel: { padding: 10 },
                        axis: { stroke: 'none' },
                        grid: { stroke: 'grey', strokeWidth: 0.25, opacity: 0.5 }
                      }}
                      axisValue={i + 1}
                      tickFormat={() => ''}
                      tickValues={[0.25, 0.5, 0.75]}
                    />
                  )
                })}
              <VictoryPolarAxis
                labelPlacement="vertical"
                tickFormat={(t) => {
                  // Check if the length of the string is more than 10 characters
                  if (t.length > 10) {
                    // Split the string at each space
                    const chunks = t.split(/\s+/)

                    // Join the chunks with a newline character, but skip newline if the next character is "&"
                    const formattedString = chunks.reduce((result: string, chunk: string, index: number) => {
                      if (index < chunks.length - 1 && chunks[index + 1][0] === '&') {
                        // If the next chunk starts with "&", don't add a newline
                        return result + chunk + ' '
                      } else {
                        // Otherwise, add a newline
                        return result + chunk + '\n'
                      }
                    }, '')

                    return formattedString.trim() // Remove trailing whitespace
                  }
                  // Return the original string if it's 10 characters or less
                  return t
                }}
                style={{
                  axis: { stroke: 'none' },
                  grid: { stroke: 'green', opacity: 0.5 },
                  tickLabels: {
                    fill: 'white',
                    fontSize: 10
                  }
                }}
              />
            </VictoryChart>
          </View>
        </>
      ) : (
        <S.Description>No skills found</S.Description>
      )}
      {cursus.skills.length > 0 && (
        <>
          <S.Subtitle>Details</S.Subtitle>
          {cursus.skills.map((skill: ISkill, index) => (
            <S.Skill key={index}>
              <S.SkillName>{skill.name}</S.SkillName>
              <LevelBar level={parseFloat(skill.level.toFixed(2))} />
            </S.Skill>
          ))}
        </>
      )}
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
  Subtitle: styled.Text`
    color: ${(p) => p.theme.primary};
    font-family: Urbanist_Bold;
    font-weight: 900;
    font-size: ${(p) => p.theme.size(24, 'px')};
    margin-bottom: ${(p) => p.theme.size(20, 'px')};
  `,
  Description: styled.Text`
    color: ${(p) => p.theme.primary};
    font-family: Urbanist;
    font-weight: 600;
    font-size: ${(p) => p.theme.size(15, 'px')};
    margin-bottom: ${(p) => p.theme.size(15, 'px')};
  `,
  Skill: styled.View`
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 10px;
  `,
  SkillName: styled.Text`
    color: white;
    font-family: Urbanist;
    font-size: ${(p) => p.theme.size(18, 'px')};
  `
}
