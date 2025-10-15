
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, StyleSheet, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

const communityPosts = [
  { id: '1', category: 'Insect Identification', title: 'Discovering the Monarch Butterfly', description: 'Elena Ramirez shared a sighting of a Monarch Butterfly in her garden. Join the discussion!', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCU__03wbecYESmZihy6Rl_cDBlih4nlgKdemDqfo6OA-Bm31TJU7OVRJhCkTy7D7fRfCclPxB41TAW_H-mPi_wnh2LNm9Av6BfT7sCwUiANtsijn6ltYoh6qO6uYICONviqunaDFubRNJaIc06ohotoR0pZkSWkWKjUXlE2Ckb6NiJDOQun89fywKsRUW5pDgbYy-IC-Xc0i0h529FfdWRA065VSjZk7LFPYxxYNALRaIzGpuLvjP6zE0puaxdgrUBmPC2EKDjxpQ', likes: 25, dislikes: 3, comments: 12 },
  { id: '2', category: 'Biodiversity Conservation', title: 'Protecting Native Bees', description: 'Ricardo Gomez posted about the importance of native bees and how to create a bee-friendly habitat. Check out his tips!', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArnQIighA9FvwUPnpqWuu-QDBY9kjdq8jwS3sOZ4S9NylnZ_2ca_EQjq5yR4PXQmTs4fPzjWFp60Di6PApXN6WyS1Iy55aANJ-tyeWO64wx7ia0Q0jw4YN8fyDOfLhfpACRrXjfJW83y8kdEqDv2lI46XE1PxbOnNDUxHVeohlJzFRQcW0vFegLYqyYrLUsVmgtZKlV4K-5TaNYYb0ntM7zLyIa2VISBU9WTjMPzwxUJrowDTACu3QnBR8PRQvtGWhTFHJ9bNXbNs', likes: 42, dislikes: 5, comments: 28 },
];

const ArrowLeftIcon = () => <Svg width="24px" height="24px" fill="#111811" viewBox="0 0 256 256"><Path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></Path></Svg>;
const PlusIcon = () => <Svg width="24px" height="24px" fill="#111811" viewBox="0 0 256 256"><Path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></Path></Svg>;
const SearchIcon = () => <Svg width="24px" height="24px" fill="#638863" viewBox="0 0 256 256"><Path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></Path></Svg>;
const ThumbsUpIcon = () => <Svg width="24px" height="24px" fill="#638863" viewBox="0 0 256 256"><Path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z"></Path></Svg>;
const ThumbsDownIcon = () => <Svg width="24px" height="24px" fill="#638863" viewBox="0 0 256 256"><Path d="M239.82,157l-12-96A24,24,0,0,0,204,40H32A16,16,0,0,0,16,56v88a16,16,0,0,0,16,16H75.06l37.78,75.58A8,8,0,0,0,120,240a40,40,0,0,0,40-40V184h56a24,24,0,0,0,23.82-27ZM72,144H32V56H72Zm150,21.29a7.88,7.88,0,0,1-6,2.71H152a8,8,0,0,0-8,8v24a24,24,0,0,1-19.29,23.54L88,150.11V56H204a8,8,0,0,1,7.94,7l12,96A7.87,7.87,0,0,1,222,165.29Z"></Path></Svg>;
const ChatIcon = () => <Svg width="24px" height="24px" fill="#638863" viewBox="0 0 256 256"><Path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"></Path></Svg>;
const ShareIcon = () => <Svg width="20px" height="20px" fill="#111811" viewBox="0 0 256 256"><Path d="M229.66,109.66l-48,48a8,8,0,0,1-11.32-11.32L204.69,112H165a88,88,0,0,0-85.23,66,8,8,0,0,1-15.5-4A103.94,103.94,0,0,1,165,96h39.71L170.34,61.66a8,8,0,0,1,11.32-11.32l48,48A8,8,0,0,1,229.66,109.66ZM192,208H40V88a8,8,0,0,0-16,0V208a16,16,0,0,0,16,16H192a8,8,0,0,0,0-16Z"></Path></Svg>;

const PostCard = ({ post }) => (
  <View style={styles.cardContainer}>
    <View style={styles.cardContent}>
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardCategory}>{post.category}</Text>
        <Text style={styles.cardTitle}>{post.title}</Text>
        <Text style={styles.cardDescription}>{post.description}</Text>
      </View>
      <Image source={{ uri: post.imageUrl }} style={styles.cardImage} />
    </View>
    <View style={styles.cardActionsContainer}>
        <View style={styles.feedbackActions}>
            <TouchableOpacity style={styles.actionIcon}><ThumbsUpIcon /><Text style={styles.actionText}>{post.likes}</Text></TouchableOpacity>
            <TouchableOpacity style={styles.actionIcon}><ThumbsDownIcon /><Text style={styles.actionText}>{post.dislikes}</Text></TouchableOpacity>
            <TouchableOpacity style={styles.actionIcon}><ChatIcon /><Text style={styles.actionText}>{post.comments}</Text></TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.shareButton}><ShareIcon /><Text style={styles.shareButtonText}>Share</Text></TouchableOpacity>
    </View>
  </View>
);

export default function CommunityScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.headerIcon}><ArrowLeftIcon /></TouchableOpacity>
        <Text style={styles.headerTitle}>Community</Text>
        <TouchableOpacity style={styles.headerIcon}><PlusIcon /></TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
            <View style={styles.searchIconContainer}><SearchIcon /></View>
            <TextInput placeholder="Search" style={styles.searchInput} placeholderTextColor="#638863" />
        </View>
      </View>

      <FlatList
        data={communityPosts}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'white' },
  headerContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingBottom: 8, height: 50 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#111811' },
  headerIcon: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  searchContainer: { paddingHorizontal: 16, paddingVertical: 12 },
  searchInputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f4f0', borderRadius: 8, height: 48 },
  searchIconContainer: { paddingLeft: 16 },
  searchInput: { flex: 1, height: '100%', paddingHorizontal: 8, color: '#111811', fontSize: 16 },
  listContainer: { paddingHorizontal: 16, gap: 24, paddingVertical: 16 },
  cardContainer: { gap: 12 },
  cardContent: { flexDirection: 'row', justifyContent: 'space-between', gap: 16 },
  cardTextContainer: { flex: 2, flexDirection: 'column', gap: 4 },
  cardCategory: { color: '#638863', fontSize: 14 },
  cardTitle: { color: '#111811', fontSize: 16, fontWeight: 'bold' },
  cardDescription: { color: '#638863', fontSize: 14 },
  cardImage: { flex: 1, aspectRatio: 16 / 9, borderRadius: 8 },
  cardActionsContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  feedbackActions: { flexDirection: 'row', gap: 16 },
  actionIcon: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  actionText: { color: '#638863', fontSize: 13, fontWeight: 'bold' },
  shareButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f4f0', borderRadius: 8, paddingHorizontal: 16, height: 40, gap: 8 },
  shareButtonText: { color: '#111811', fontSize: 14, fontWeight: 'bold' },
});
