/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable react/react-in-jsx-scope */

import { View, StyleSheet, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
const {width, height} = Dimensions.get('window');

export default function Loading() {
    return (
        <View style={styles.loadingCont}>
          <Progress.CircleSnail size={160} color={['#eab308', 'white']} thickness={12} />
        </View>
    );
}

const styles = StyleSheet.create({
    loadingCont: {
      height: height,
      width: width,
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingTop: '40%',
    },
  });