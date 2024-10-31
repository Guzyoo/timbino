// ImageSlider.tsx
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
} from 'react-native';

const {width} = Dimensions.get('screen');

interface ImageSliderProps {
  images: number[];
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  activeIndex: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  onScroll,
  activeIndex,
}) => {
  return (
    <View>
      <FlatList
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        pagingEnabled
        snapToAlignment="start"
        snapToInterval={width * 0.75}
        decelerationRate="fast"
        renderItem={({item}) => <Image source={item} style={styles.image} />}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.contentContainer}
      />

      {/* Dot Indicator */}
      <View style={styles.indicatorContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeIndex && styles.activeDot, // Gaya titik aktif
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: width * 0.75, // Lebar gambar dikurangi untuk memperlihatkan gambar sebelahnya
    resizeMode: 'contain',
    marginHorizontal: 3,
  },
  contentContainer: {
    paddingHorizontal: 10, // Mengatur posisi awal dan akhir
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    height: 11,
    width: 11,
    borderRadius: 11,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FF8261', // Warna titik untuk gambar yang sedang dilihat
    width: 11,
    height: 11,
  },
});

export default ImageSlider;
