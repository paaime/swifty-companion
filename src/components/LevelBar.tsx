import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const formatNumberToLevelPercentage = (level: number) => {
  // Split the number into integer and decimal parts
  const integerPart = Math.floor(level)
  const decimalPart = Math.round((level - integerPart) * 100)

  // Format the string
  const resultString = `Level ${integerPart} - ${decimalPart}%`

  return resultString
}

const getBarWidth = (level: number, maxLevel: number, userLevel: boolean) => {
  // if userLevel is true, we the level will be the decimal part of the level
  if (userLevel) {
    const integerPart = Math.floor(level)
    const decimalPart = Math.round((level - integerPart) * 100)
    return decimalPart
  }
  return (level / maxLevel) * 100
}

const LevelBar = ({ level, maxLevel = 21, userLevel = false }: { level: number; maxLevel?: number; userLevel?: boolean }) => {
  // Calculate the percentage width of the bar based on the level
  const barWidth = getBarWidth(level, maxLevel, userLevel)

  return (
    <View style={[styles.container, { height: userLevel ? 30 : 20 }]}>
      <View style={[styles.bar, { width: `${barWidth}%` }]} />
      <Text style={[styles.levelText, { fontSize: userLevel ? 15 : 12 }]}>{userLevel ? formatNumberToLevelPercentage(level) : level}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 30,
    backgroundColor: '#232627',
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center'
  },
  bar: {
    height: '100%',
    backgroundColor: '#4267B2',
    borderRadius: 8
  },
  levelText: {
    position: 'absolute',
    color: 'white',
    fontFamily: 'Urbanist_Semi',
    fontSize: 15,
    textAlign: 'center',
    width: '100%'
  }
})

export default LevelBar
