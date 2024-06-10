import React from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import Routes from '../../Navigation/Routes';
import { color } from '../../Theme/color';
import { ffamily } from '../../Theme/font';
const dummyImage = require('../../Images/story.png');

const { width } = Dimensions.get('window');

const Stories = ({ loading, savedArticleArray }) => {
  const navigation = useNavigation();

  const handlePress = (category, id) => {
    navigation.navigate(Routes.ArticleDetails, {
      Category: category,
      articleId: id,
    });
  };

  if (loading) {
    return (
      <SkeletonPlaceholder width={width} borderRadius={15}>
        <SkeletonPlaceholder.Item
          marginTop={20}
          marginLeft={15}
          flexDirection="row">
          {[1, 2, 3, 4, 5].map(elem => (
            <SkeletonPlaceholder.Item
              key={elem}
              width={70}
              height={70}
              marginBottom={20}
              marginHorizontal={5}
              borderRadius={50}
            />
          ))}
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        style={{ paddingHorizontal: width * 0.02 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={savedArticleArray}
        renderItem={({ item, index }) => {
          return (
            <Pressable
              style={[
                styles.singleStory,
                {
                  marginRight:
                    index === savedArticleArray.length - 1 ? width * 0.05 : 0,
                },
              ]}>
              <View style={[styles.story, styles.blueBorder]}>
                <TouchableOpacity
                  onPress={() => handlePress(item?.category, item?.id)}>
                  <Image
                    source={
                      item?.imageUrl ? { uri: item?.imageUrl } : dummyImage
                    }
                    resizeMode="cover"
                    style={[styles.storyImage]}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.text} numberOfLines={2}>
                {item?.generatedTitle}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default Stories;

const styles = StyleSheet.create({
  blueBorder: { borderColor: color.primary, borderWidth: 2 },
  container: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
  },
  singleStory: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: 5,
  },
  story: {
    borderRadius: 100,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 3,
  },
  storyImage: {
    borderRadius: 100,
    height: 54,
    width: 54,
    padding: 10,
  },

  text: {
    fontFamily: ffamily.HellixRegular,
    textAlign: 'center',
    width: 66,
    overflow: 'hidden',
    fontSize: 12,
    lineHeight: 16,
    color: color?.black,
    opacity: 80,
  },
});
