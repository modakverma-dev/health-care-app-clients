import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import Share from 'react-native-share';
import ViewShot from 'react-native-view-shot';
import axios from 'axios';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useSelector } from 'react-redux';

import files from '../../Images/fileBase64';
import Save from '../../Icons/News/Save';
import Send from '../../Icons/News/Send';
import { color } from '../../Theme/color';
import { ffamily } from '../../Theme/font';
import PerspectiveButton from '../../Components/PerspectiveButton';
import Back from '../../Icons/Back';
import commonStyles from '../../Theme/common';
import ArrowIcon from '../../Icons/ArrowIcon';
import { newsDetailApi, saveNews } from '../../Api/newsApi';
import { showErrormessage, showSuccessToast } from '../../Utils/toastMessages';
import { isValidJSON } from '../../Utils/validations';
import ArticleSources from './ArticleSources';
import LinearGradient from 'react-native-linear-gradient';
const dummyImage = require('../../Images/story.png');

const { width, height } = Dimensions.get('window');

const SingleArticle = ({
  articleId,
  resultCategoryIds,
  currentIndex,
  setResultCategoryIds,
}) => {
  const scrollRef = useAnimatedRef();
  const navigation = useNavigation();
  const scrollOfset = useScrollViewOffset(scrollRef);

  const token = useSelector(state => state.auth.token);
  const [activePerspectiveIndex, setActivePerspectiveIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const { savedArticleArray } = useSelector(state => state.saved);
  const savedArticleIds = savedArticleArray.map(item => item.id);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(5);

  let checkIfSaved;
  if (typeof articleId === 'object') {
    checkIfSaved = savedArticleIds.includes(
      articleId[currentArticleIndex]?.id?.toString(),
    );
  }

  useEffect(() => {
    setIsSaved(checkIfSaved);
  }, [checkIfSaved]);

  const fetchData = async () => {
    try {
      const res = await axios.get(newsDetailApi(articleId), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        const newArr = [...resultCategoryIds];
        newArr[currentIndex] = res?.data;
        setResultCategoryIds(newArr);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (
      typeof articleId !== 'object' &&
      resultCategoryIds[currentIndex] === articleId
    ) {
      fetchData();
    }
  }, [currentIndex]);

  const ref = useRef();

  const onShare = async () => {
    ref.current.capture().then(uri => {
      console.log('do something with ', uri);
    });
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

  const onSave = async () => {
    try {
      const res = await axios.post(
        saveNews,
        {
          articleId: articleId[currentArticleIndex]?.id,
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
      }
    } catch (err) {
      if (err?.response?.status === 409) {
        showErrormessage(err?.response?.data?.message);
      }
      console.log(err);
    }
  };

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOfset.value,
            [-height / 3, 0, height / 3],
            [-height / 6, 0, height / 4],
          ),
        },
        {
          scale: interpolate(
            scrollOfset.value,
            [-height / 3, 0, height / 3],
            [2, 1, 1],
          ),
        },
      ],
    };
  });

  if (typeof articleId !== 'object') {
    return (
      <ScrollView width={width} ref={scrollRef}>
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width={width}
              height={height / 3}
              marginBottom={20}
            />
            <SkeletonPlaceholder direction="column" borderTopLeftRadius={15}>
              <SkeletonPlaceholder.Item flexDirection="row">
                <SkeletonPlaceholder.Item
                  marginLeft={20}
                  marginTop={6}
                  width={50}
                  height={50}
                  borderRadius={50}
                />
                <SkeletonPlaceholder.Item
                  marginLeft={20}
                  marginTop={6}
                  width={width - 140}
                  height={50}
                  borderRadius={8}
                />
              </SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item
                marginTop={25}
                marginHorizontal={20}
                width={width - 40}
                height={250}
                borderRadius={8}
              />
              <SkeletonPlaceholder.Item
                marginTop={25}
                marginHorizontal={20}
                width={width - 40}
                height={30}
                borderRadius={8}
              />
              <SkeletonPlaceholder.Item
                marginTop={25}
                marginHorizontal={20}
                width={width - 40}
                height={250}
                borderRadius={8}
              />
            </SkeletonPlaceholder>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </ScrollView>
    );
  }

  const parsedPerspectiveObject = articleId?.length
    ? isValidJSON(articleId[currentArticleIndex]?.prespective)
      ? JSON.parse(articleId[currentArticleIndex]?.prespective)
      : {}
    : {};
  const perspectiveArray = parsedPerspectiveObject
    ? Object.keys(parsedPerspectiveObject)
    : [];
  return (
    <Animated.ScrollView
      ref={scrollRef}
      style={{ width: width }}
      scrollEventThrottle={16}>
      <Animated.View style={[styles.bannerContainer, imageAnimatedStyle]}>
        <ImageBackground
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
          source={
            articleId && articleId[currentArticleIndex]?.imageUrl
              ? {
                  uri: articleId[currentArticleIndex]?.imageUrl || '',
                }
              : dummyImage
          }>
          <LinearGradient
            colors={[
              'rgba(0, 0, 0, 0.3)',
              'rgba(0, 0, 0, 0.4)',
              'rgba(0, 0, 0, 0.9)',
            ]}
            style={{ height: '100%', width: '100%' }}
          />
        </ImageBackground>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backIconBackground}>
          <Back stroke="white" />
        </Pressable>
      </Animated.View>
      <ViewShot
        ref={ref}
        options={{ fileName: 'Your-File-Name', format: 'jpg', quality: 0.9 }}>
        <View
          style={[styles.bottomSheetContainer, commonStyles.paddingHorizontal]}>
          <View style={styles.authorDetails}>
            <View style={[styles.singleStory]}>
              <View style={[styles.story, styles.blackBorder]}>
                <TouchableOpacity>
                  <Image
                    source={
                      articleId && articleId[currentArticleIndex]?.imageUrl
                        ? {
                            uri: articleId[currentArticleIndex]?.imageUrl,
                          }
                        : dummyImage
                    }
                    resizeMode="cover"
                    style={[styles.storyImage]}
                  />
                </TouchableOpacity>
              </View>
              <Text
                style={{ color: color.primary, width: width / 2 }}
                numberOfLines={2}>
                {articleId[currentArticleIndex]?.generatedTitle}
              </Text>
            </View>

            <View style={styles.iconContainer}>
              <TouchableOpacity
                onPress={onSave}
                style={[
                  styles.iconBackground,
                  {
                    backgroundColor: isSaved ? color.primary : '#F4F4F4',
                  },
                ]}>
                <Save stroke={isSaved ? 'white' : color.primary} />
              </TouchableOpacity>
              <TouchableOpacity onPress={onShare} style={styles.iconBackground}>
                <Send stroke={color.primary} />
              </TouchableOpacity>
            </View>
          </View>
          {articleId?.length > 1 ? (
            <View
              style={{
                paddingHorizontal: 25,
                marginVertical: 15,
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Pressable
                onPress={() => {
                  if (currentArticleIndex > 0) {
                    setCurrentArticleIndex(prev => prev - 1);
                    if (low > 0) {
                      setLow(prev => prev - 1);
                      setHigh(prev => prev - 1);
                    }
                  }
                }}
                style={{ alignItems: 'center', width: 50 }}>
                {currentArticleIndex > 0 && (
                  <>
                    <ArrowIcon />
                    <Text style={{ color: color.primary }}>Context</Text>
                  </>
                )}
              </Pressable>
              <View style={{ flexDirection: 'row', gap: 5 }}>
                {[...Array(articleId.length)]
                  ?.slice(low, high)
                  .map((item, index) => {
                    const isActive = currentArticleIndex % 5 === index % 5;
                    return (
                      <View
                        key={index}
                        style={[
                          styles.tab,
                          { opacity: isActive ? 1 : 0.3 },
                          { width: isActive ? 25 : 10 },
                        ]}
                      />
                    );
                  })}
              </View>

              <Pressable
                onPress={() => {
                  if (currentArticleIndex < articleId?.length - 1) {
                    setCurrentArticleIndex(prev => prev + 1);
                    if (high <= articleId.length) {
                      setLow(prev => prev + 1);
                      setHigh(prev => prev + 1);
                    }
                  }
                }}
                style={{
                  alignItems: 'center',
                  width: 50,
                }}>
                {currentArticleIndex < articleId?.length - 1 && (
                  <>
                    <ArrowIcon invert />
                    <Text style={{ color: color.primary }}>Latest</Text>
                  </>
                )}
              </Pressable>
            </View>
          ) : null}
          <Text style={styles.articleTitle}>
            {articleId[currentArticleIndex]?.generatedTitle}
          </Text>
          <Text style={styles.articleTitle}>Perspectives</Text>
          <View
            style={{
              width,
              flexDirection: 'row',
              gap: 10,
              flexWrap: 'wrap',
            }}>
            {perspectiveArray?.map((item, index) => (
              <View key={index}>
                <PerspectiveButton
                  handlePress={() => {
                    setActivePerspectiveIndex(index);
                  }}
                  active={activePerspectiveIndex === index}
                  key={index}
                  buttontext={item}
                />
              </View>
            ))}
          </View>

          <Text style={styles.articleSummary}>
            {parsedPerspectiveObject &&
              parsedPerspectiveObject[perspectiveArray[activePerspectiveIndex]]}
          </Text>
          <ArticleSources articleData={articleId[currentArticleIndex]} />
        </View>
      </ViewShot>
    </Animated.ScrollView>
  );
};

export default SingleArticle;

const styles = StyleSheet.create({
  tab: {
    width: 10,
    height: 10,
    borderRadius: 4,
    backgroundColor: color.primary,
    marginLeft: 5,
  },
  articleSummary: {
    color: color.black,
    fontFamily: ffamily.HellixRegular,
    fontSize: 16,
    lineHeight: 26,
    textAlign: 'left',
    marginVertical: 5,
  },
  articleTitle: {
    color: color.black,
    fontFamily: ffamily.HellixSemiBold,
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'left',
    marginVertical: 5,
  },
  blackBorder: { borderColor: color.primary, borderWidth: 2 },
  singleStory: {
    width: 50,
    height: 50,
    display: 'flex',
    flex: 1,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  story: {
    borderRadius: 100,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyImage: {
    borderRadius: 100,
    height: 42,
    width: 42,
    padding: 10,
  },
  iconBackground: {
    width: 35,
    height: 35,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
  },
  authorDetails: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    position: 'relative',
    width: width,
    height: height,
    flex: 1,
    overflow: 'auto',
    backgroundColor: 'black',
  },
  bannerContainer: {
    backgroundColor: color.backgroundBlur(0.3),
    width: width,
    position: 'relative',
    height: height / 3,
  },
  bottomSheetContainer: {
    position: 'relative',
    height: 'auto',
    backgroundColor: color.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 25,
    width: width,
  },
  backIconBackground: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    width: 50,
    height: 50,
    left: width * 0.04,
    top: width * 0.05,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
});
