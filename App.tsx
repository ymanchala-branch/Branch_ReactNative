import React, {useState , useEffect} from 'react';
import branch from 'react-native-branch';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
  
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;



function Section({ children, title }: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const urls = [
    { "branch": "https://yash.devishetty.net/WDSFEy6vAMb" },
    { "branch": "https://yash.devishetty.net/e/baWd1jtcsLb" },
    { "branch": "https://yash.devishetty.net/GYFvXLVIBJb" },
    { "branch": "https://yash.devishetty.net/vfiR8v7ndJb" },
    { "branch": "https://yash.devishetty.net/XmDH7b5ndJb" }
  ];
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

  useEffect(() => {
    console.log("Test test34566")
    branch.subscribe({
      onOpenStart: ({
          uri,
          cachedInitialEvent
      }) => {
          console.log(
              'subscribe onOpenStart, will open ' +
              uri +
              ' cachedInitialEvent is ' +
              cachedInitialEvent,
          );
      },
      onOpenComplete: ({
          error,
          params,
          uri
      }) => {
          if (error) {
              console.error(
                  'subscribe onOpenComplete, Error from opening uri: ' +
                  uri +
                  ' error: ' +
                  error,
              );
              return;
          }
          else if (params) {
              if (!params['+clicked_branch_link']) {
                  if (params['+non_branch_link']) {
                      console.log('non_branch_link: ' + uri);
                      // Route based on non-Branch links
                      return;
                  }
              } else {
                  // Handle params
                  let deepLinkPath = params.$deeplink_path as string; 
                  let canonicalUrl = params.$canonical_url as string;
                  const paramsString = JSON.stringify(params, null, 2); // Convert params to a formatted JSON string
                  Alert.alert('Branch Params', paramsString);
                  // Route based on Branch link data 
                  return
              }
          }
      },
  });
  }, []);


  const handlePress = async (url: string) => {  
    try {
      setSelectedUrl(url); // Update selected URL to the string value
      if (branch) {
        await branch.openURL(url); // Open the Branch URL
      } else {
        console.error('Branch SDK is not initialized');
      }
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1 }}>
      <View style={{ padding: 20 }}>
        {/* Map through the urls array to dynamically create buttons */}
        {urls.map((urlObj, index) => (
          <View key={index} style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 14 }}>Link: {urlObj.branch}</Text>
            <TouchableOpacity
              style={{ backgroundColor: 'grey', padding: 10, marginTop: 10, borderRadius: 10}}
              onPress={() => handlePress(urlObj.branch)}>
              <Text style={{ color: '#fff', fontSize: 16 }}>Click</Text>
            </TouchableOpacity>
          </View>
        ))}
        {/* Display the selected URL */}
        {selectedUrl && (
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>Selected URL: {selectedUrl}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 300,
    paddingHorizontal: 24,
  },
  urlText: {
    fontSize: 14,
    marginBottom: 20,
  },
  container: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  button: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center', // Adds space above the button
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1, // Take up the full height
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  paramsContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#e0e0e0', // Light gray background for the rectangle
    borderRadius: 5,
    width: '100%', // Full width of the container
    alignItems: 'center', // Center text horizontally
  },
  paramsText: {
    fontSize: 16,
    color: '#333', // Dark text color
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default App;
