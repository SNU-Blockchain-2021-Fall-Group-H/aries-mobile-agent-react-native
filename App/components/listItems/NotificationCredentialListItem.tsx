import type { CredentialRecord } from '@aries-framework/core'

import { useConnectionById } from '@aries-framework/react-hooks'
import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { textColor, backgroundColor, borderRadius } from '../../globalStyles'
import { parseSchema } from '../../helpers'
import Text from '../texts/Text'

interface Props {
  notification: CredentialRecord
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    paddingVertical: 10,
    paddingLeft: 10,
    borderRadius,
    backgroundColor,
  },
  title: {
    fontWeight: 'bold',
  },
})

const NotificationCredentialListItem: React.FC<Props> = ({ notification }) => {
  const navigation = useNavigation()

  const { metadata, connectionId, id } = notification

  const connection = useConnectionById(connectionId)

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Credential Offer', { credentialId: id })}
    >
      <View>
        <Text style={styles.title}>{parseSchema(metadata?.schemaId)}</Text>
        <Text>{connection?.alias || connection?.invitation?.label}</Text>
      </View>
      <Icon name="chevron-right" color={textColor} size={30} />
    </TouchableOpacity>
  )
}

export default NotificationCredentialListItem
