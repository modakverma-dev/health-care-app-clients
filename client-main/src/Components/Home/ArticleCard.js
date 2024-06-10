import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  ImageBackground,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import Save from '../../Icons/News/Save';
import Send from '../../Icons/News/Send';
import Routes from '../../Navigation/Routes';
import Share from 'react-native-share';
import { saveNews } from '../../Api/newsApi';
import { color } from '../../Theme/color';
import { ffamily } from '../../Theme/font';
import { showErrormessage, showSuccessToast } from '../../Utils/toastMessages';
import { BASE_URL } from '../../constant';
import LinearGradient from 'react-native-linear-gradient';
import ViewShot from 'react-native-view-shot';

const dummyImage = require('../../Images/story.png');

const ArticleCard = ({
  CardData,
  Category,
  fetchSavedArticles,
  savedArticleArray,
}) => {
  const { token } = useSelector(state => state.auth);
  const { navigate } = useNavigation();
  const savedArticleIds = savedArticleArray.map(item => item.id);
  const checkIfSaved = savedArticleIds.includes(CardData?.id?.toString());
  const ref = useRef();

  const [isSaved, setIsSaved] = useState(false);
  useEffect(() => {
    setIsSaved(checkIfSaved);
  }, [checkIfSaved]);

  const onSave = async () => {
    try {
      const res = await axios.post(
        saveNews,
        {
          articleId: CardData?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.status === 201) {
        showSuccessToast(res?.data?.message);
        if (res?.data?.message === 'Article Saved !') {
          setIsSaved(true);
        }
        if (res?.data?.message === 'Article UnSaved !') {
          setIsSaved(false);
        }
        if (fetchSavedArticles) {
          fetchSavedArticles();
        }
      }
    } catch (err) {
      if (err?.response?.status === 409) {
        showErrormessage(err?.response?.data?.message);
      }
      console.log(err);
    }
  };
  const onShare = async () => {
    try {
      await Share.open({
        message: `${CardData?.generatedTitle} Read more at:`,
        url: CardData?.imageUrl,
        urls: [`${BASE_URL}/news/${CardData?.id}`],
      });
    } catch (err) {
      console.log('react-native share error: ', err);
    }
  };

  return (
    <Pressable
      onPress={() => {
        navigate(Routes.ArticleDetails, { articleId: CardData?.id, Category });
      }}
      style={styles.container}>
      <ViewShot ref={ref}>
        <ImageBackground
          source={
            CardData?.imageUrl
              ? {
                  uri: CardData?.imageUrl || '',
                }
              : dummyImage
          }
          resizeMode="cover"
          style={styles.container}>
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.35)', 'rgba(0, 0, 0, 0.7)']}
            style={{ height: '100%', width: '100%' }}
          />
        </ImageBackground>

        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={onSave}
            style={[
              styles.icon,
              {
                backgroundColor: isSaved
                  ? color.primary
                  : color.backgroundBlur(0.3),
              },
            ]}>
            <Save />
          </TouchableOpacity>
          <TouchableOpacity onPress={onShare} style={styles.icon}>
            <Send />
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <Text numberOfLines={3} ellipsizeMode="tail" style={styles.title}>
            {CardData?.generatedTitle}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
            }}>
            <View style={styles.imageWrap}>
              <Image
                source={
                  CardData?.imageUrl
                    ? {
                        uri: CardData?.imageUrl || '',
                      }
                    : dummyImage
                }
                resizeMode="cover"
                style={styles.image}
              />
            </View>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.authName}>
              {CardData?.generatedTitle}
            </Text>
          </View>
        </View>
      </ViewShot>
    </Pressable>
  );
};

export default ArticleCard;

const styles = StyleSheet.create({
  linearGradient: {
    height: '100%',
    width: '100%',
  },
  container: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    flex: 1,
    backgroundColor: color.backgroundBlur(0.4),
  },
  iconContainer: {
    position: 'absolute',
    gap: 20,
    top: 30,
    right: 25,
    flexDirection: 'row',
  },
  icon: {
    backgroundColor: color.backgroundBlur(0.3),
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    width: 35,
    borderRadius: 100,
    transform: [{ scale: 1.3 }],
  },
  textContainer: { position: 'absolute', bottom: 0, padding: 20, gap: 10 },
  title: {
    color: 'white',
    fontFamily: ffamily.HellixRegular,
    fontSize: 17,
    lineHeight: 26,
  },
  imageWrap: {
    borderColor: color.primary,
    borderWidth: 2,
    borderRadius: 100,
    padding: 2,
  },
  image: {
    height: 40,
    width: 40,
    objectFit: 'cover',
    borderRadius: 100,
  },
  authName: {
    // paddingRight: 20,
    color: 'white',
    fontFamily: ffamily.HellixRegular,
    fontSize: 14,
    maxWidth: '75%',
  },
});
