import React from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { ffamily } from '../../Theme/font';
import { color } from '../../Theme/color';

const ArticleSources = ({ articleData }) => {
  const newsSourses = [
    {
      source: 'BBC',
      url: 'bbci.co.uk',
      logo: 'https://res.cloudinary.com/dqdmghazh/image/upload/v1715866614/aina/BBC_yjbj1t.png',
    },
    {
      source: 'IndiaTV',
      url: 'indiatvnews.com"',
      logo: 'https://res.cloudinary.com/dqdmghazh/image/upload/v1715866616/aina/IndiaTV_peeuxh.png',
    },
    {
      source: 'DNAIndia',
      url: 'dnaindia.com',
      logo: 'https://res.cloudinary.com/dqdmghazh/image/upload/v1715866614/aina/DNAIndia_trzvgn.png',
    },
    {
      source: 'News18',
      url: 'news18.com',
      logo: 'https://res.cloudinary.com/dqdmghazh/image/upload/v1715866615/aina/News18_uo2l82.png',
    },
    {
      source: 'NDTV',
      url: 'feedburner.com',
      logo: 'https://res.cloudinary.com/dqdmghazh/image/upload/v1715866616/aina/NDTV_julnmz.png',
    },
    {
      source: 'MINT',
      url: 'livemint.com',
      logo: 'https://res.cloudinary.com/dqdmghazh/image/upload/v1715866615/aina/MINT_qrs8us.jpg',
    },
    {
      source: 'Hindustan Times',
      url: 'hindustantimes.com',
      logo: 'https://res.cloudinary.com/dqdmghazh/image/upload/v1715867764/aina/Hindustan_Times_qayulz.png',
    },
    {
      source: 'The Hindus',
      url: 'thehindu.com',
      logo: 'https://res.cloudinary.com/dqdmghazh/image/upload/v1715866616/aina/The_Hindu_r7yhkc.jpg',
    },
    {
      source: 'Indian Express',
      url: 'indianexpress.com',
      logo: 'https://res.cloudinary.com/dqdmghazh/image/upload/v1715866615/aina/Indian_Express_s6tuth.png',
    },
  ];

  return (
    <View>
      {articleData?.sources?.length > 0 && (
        <Text style={styles.sourcesText}>Article Sources</Text>
      )}
      <View style={styles.newsWrap}>
        {articleData?.sources?.map((source, id) => {
          const newsSource = newsSourses.find(
            newsSource => newsSource.source === source?.sources,
          );
          if (newsSource) {
            return (
              <TouchableOpacity
                key={id}
                onPress={() => {
                  Linking.openURL(source?.links);
                }}>
                <Image source={{ uri: newsSource.logo }} style={styles.logo} />
              </TouchableOpacity>
            );
          }
        })}
      </View>
    </View>
  );
};

export default ArticleSources;

const styles = StyleSheet.create({
  sourcesText: {
    fontSize: 19,
    color: color.black,
    fontFamily: ffamily.HellixMedium,
    marginVertical: 10,
  },
  newsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 36,
    height: 36,
    objectFit: 'contain',
    borderRadius: 200,
  },
});
