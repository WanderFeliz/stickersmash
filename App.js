import * as MediaLibrary from 'expo-media-library';
import Main from './src/Main';


export default function App() {

  const [status, requestPermission] = MediaLibrary.usePermissions();

  if (status === null) {
    requestPermission();
  }

  return (
    <Main />
  );
}
