import React, { useState } from 'react';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { color } from '../../Theme/color';
import ArticleCard from './ArticleCard';
import commonStyles from '../../Theme/common';
import { ffamily } from '../../Theme/font';
import { categoryNewsApi } from '../../Api/newsApi';

const { height, width } = Dimensions.get('window');

const ArticeSlider = ({
  Category,
  CategorisedData,
  categoryNewsData,
  setCategoryNewsData,
  fetchSavedArticles,
  savedArticleArray,
}) => {
  const token = useSelector(state => state.auth.token);
  const [page, setPage] = useState(1);
  const pageSize = 15;
  const [currentIndex, setCurrentIndex] = useState(0);
  const categoryIndex = categoryNewsData.findIndex(
    section => section[Category],
  );
  const [loading, setLoading] = useState(false);
  const fetchPaginatedData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        categoryNewsApi(pageSize, page + 1, Category),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.status === 200) {
        setLoading(false);
        if (categoryIndex !== -1) {
          const orgCategoryArr = categoryNewsData[categoryIndex][Category];
          console.log(res?.data, 'res.data');
          const newArr = res?.data[0][Category];

          const appendededList = [...orgCategoryArr, ...newArr];
          setCategoryNewsData(prevArray => {
            const newArray = [...prevArray];
            newArray[categoryIndex][Category] = appendededList;
            return newArray;
          });
        }
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      if (err.toJSON().message === 'Network Error') {
        Toast.show('Move to a better network');
        return;
      }
    }
  };

  return (
    <View style={styles.root}>
      <View>
        <View style={commonStyles.paddingHorizontal}>
          <Text style={styles?.categoryTitle}>{Category}</Text>
        </View>
        <View
          style={{
            display: 'flex',
            alignItems: 'start',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <FlatList
            style={(commonStyles.paddingHorizontal, { paddingRight: 100 })}
            showsHorizontalScrollIndicator={false}
            horizontal
            onScroll={e => {
              const x = e.nativeEvent.contentOffset.x;
              setCurrentIndex(parseInt((x / (width - 150)).toFixed(0)));
              if (currentIndex >= pageSize * page - 2) {
                fetchPaginatedData();
                setPage(prev => prev + 1);
              }
            }}
            data={CategorisedData}
            renderItem={({ item, index }) => {
              return (
                <View
                  key={index}
                  style={[
                    styles.slide,
                    {
                      marginRight:
                        index === CategorisedData.length - 1 ? width * 0.08 : 0,
                      marginLeft: index === 0 ? width * 0.04 : 0,
                    },
                  ]}>
                  <TouchableOpacity style={styles.slideInterface}>
                    <ArticleCard
                      fetchSavedArticles={fetchSavedArticles}
                      Category={Category}
                      CardData={item}
                      savedArticleArray={savedArticleArray}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
          {loading && <ActivityIndicator color={color.primary} size="large" />}
        </View>
      </View>
    </View>
  );
};

export default ArticeSlider;

const styles = StyleSheet.create({
  root: {
    marginVertical: 10,
    gap: 15,
  },
  categoryTitle: {
    fontSize: 21,
    color: color.black,
    paddingHorizontal: 7,
    fontFamily: ffamily.HellixSemiBold,
  },
  slide: {
    width: width - 140,
    height: height / 2 - 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marginLeft: {
    marginLeft: 50,
  },
  marginRight: {
    marginRight: 10,
  },
  slideInterface: {
    width: '95%',
    height: '90%',
    backgroundColor: color.primary,
    borderRadius: 15,
    overflow: 'hidden',
  },
});
