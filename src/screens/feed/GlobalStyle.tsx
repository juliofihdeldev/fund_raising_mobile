import {StyleSheet, Dimensions} from 'react-native';
import {Color} from '../../assets/GlobalStyles';
export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  projectContainer: {
    backgroundColor: '#FFFFFF',
    width: Dimensions.get('window').width / 1.7,
  },
  projectTitle: {
    marginLeft: 8,
    color: '#000000',
    marginBottom: 16,
    marginTop: 16,
  },
  searchContainer: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContainer: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationIcon: {
    marginLeft: 8,
  },
  category: {
    width: 60,
    height: 60,
    backgroundColor: Color.primarylight,
  },
  categoryContainer: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  styleContainer: {
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: -8,
  },
  forestContainer: {
    height: 'auto',
  },
  projectItem: {
    backgroundColor: '#FFFFFF',
    marginVertical: 8,
    marginHorizontal: 4,
  },

  containerDetailsItem: {
    flex: 1,
    backgroundColor: '#fff',
  },
  projectContainerDetails: {
    flex: 1,
  },
  imagesView: {
    height: 240,
    marginTop: 80,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  contentText: {
    margin: 8,
  },
  description: {
    fontSize: 15,
    color: '#333',
    lineHeight: 21,
  },
  progressBarContainer: {
    width: '100%',
    backgroundColor: '#eee',
    borderRadius: 18,
    marginTop: 8,
    height: 10,
  },
  progressBar: {
    backgroundColor: 'green',
    borderRadius: 18,
    justifyContent: 'center',
  },
  goalText: {
    fontSize: 15,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 8,
  },
  goalTextBold: {
    fontSize: 21,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 8,
  },

  contentTextPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonDonate: {
    width: '100%',
    marginTop: 8,
    backgroundColor: '#8FBC8F',
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
