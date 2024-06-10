import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  Pressable,
} from 'react-native';
import React, { useEffect } from 'react';
import { ffamily } from '../../Theme/font';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Save from '../../Icons/News/Save';
import Send from '../../Icons/News/Send';
import ThreeDots from '../../Icons/News/ThreeDots';
import Routes from '../../Navigation/Routes';
import { useNavigation } from '@react-navigation/native';
const imgUrl = require('../../Images/TempImages/elon-article.png');
const profileUrl = require('../../Images/dummyImage.png');
const { width, height } = Dimensions.get('window');
import Share from 'react-native-share';
import files from '../../Images/fileBase64';

const SavedArticleCard = () => {
  const { navigate } = useNavigation();
  const translateX = useSharedValue(0);
  const gesture = Gesture.Pan().onUpdate(e => {
    translateX.value = e.translationX;
    translateX.value = withSpring(Math.min(translateX.value, 0), {
      damping: 20,
    });
    if (translateX.value < -70) {
      translateX.value = -70;
    }
  });
  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });
  useEffect(() => {
    translateX.value = withSpring(0, { damping: 50 });
  }, []);

  const onShare = async () => {
    try {
      await Share.open({
        message:
          'Read news from all perspectives. Download the AINA app to understand news better.',
        title: 'Elon Musk says X will show headlines on the platform again',
        url: files.image1,
        urls: ['https://aina-web.vercel.app/ArticleDetails'],
      });
    } catch (err) {
      console.log('react-native share error: ', err);
    }
  };

  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <Pressable
          onPress={() => {
            navigate(Routes.ArticleDetails, { articleId: '1' });
          }}>
          <Image
            source={imgUrl}
            resizeMode="cover"
            style={{ width: '100%', height: '100%' }}
          />
          <View style={styles.contentContainer}>
            <Text style={styles.articleTitle}>
              Biden, a pre-boomer is losing the young voters Democrats need
            </Text>
            <View style={styles.metaDetails}>
              <Image
                style={{ width: 40, height: 40, borderRadius: 50 }}
                source={profileUrl}
                resizeMode="cover"
              />
              <View>
                <Text style={styles.metaText}>sfasdfasdfa sdfasd</Text>
              </View>
            </View>
          </View>
        </Pressable>
        <GestureDetector gesture={gesture}>
          <Animated.View
            style={[styles.rightSheetContainer, rBottomSheetStyle]}>
            <View style={styles.sheetInnerContainer}>
              <View style={styles.line} />
              <View style={styles.iconsContainer}>
                <View style={styles.iconBackground}>
                  <Save />
                </View>
                <Pressable onPress={onShare} style={styles.iconBackground}>
                  <Send />
                </Pressable>
                <View style={styles.iconBackground}>
                  <ThreeDots />
                </View>
              </View>
            </View>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
};

export default SavedArticleCard;

const styles = StyleSheet.create({
  metaText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: ffamily.HellixSemiBold,
    color: 'white',
  },
  contentContainer: {
    position: 'absolute',
    bottom: 25,
    left: 30,
    width: '70%',
  },
  metaDetails: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  articleTitle: {
    fontSize: 20,
    lineHeight: 28,
    fontFamily: ffamily.HellixSemiBold,
    color: 'white',
  },
  container: {
    position: 'relative',
    height: (3 / 7) * height,
    borderRadius: 24,
    flex: 1,
    marginVertical: 7,
    overflow: 'hidden',
  },
  rightSheetContainer: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    height: 160,
    width: width,
    position: 'absolute',
    top: '28%',
    left: width - 48,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  sheetInnerContainer: {
    display: 'flex',
    height: '100%',
    zIndex: 10,
  },
  line: {
    width: 3,
    height: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 5,
    marginHorizontal: 6,
    position: 'absolute',
    top: '45%',
    transform: [{ translateY: -1 / 2 }],
  },
  iconsContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    gap: 8,
    marginLeft: 20,
  },
  iconBackground: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
