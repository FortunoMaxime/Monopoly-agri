import { StyleSheet, Dimensions} from "react-native";
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F7F9FC',
    },
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: height / 200,
      backgroundColor: '#228b22',
    },
    menuBurger :{
      justifyContent : 'center',
      alignItems : 'center',
      left : width /60,
    },
    topBarText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
      textAlign : 'center',
      margin: 'auto',
    },
    menuList : {
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      margin: 5,
      padding: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 5,
      width : '50%',
    },
    tOpList : {
      flexDirection : 'row',
      marginBottom : height /60,
    },
    upperContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      paddingTop: 10,
      height: height * 0.35,
    },
    upperSection: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      margin: 5,
      padding: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 5,
    },
    image: {
      flex: 1,
      flexDirection: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      width : '80%',
      height : '60%',
      margin : 'auto',
    },
    upperText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333333',
      marginBottom: 10,
    },
    floatingButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: '#34A853',
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 5,
      zIndex : 33,
    }, floatingButton2: {
      position: 'absolute',
      top: 10,
      left: 10,
      backgroundColor: '#34A853',
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 5,
      zIndex : 33,
    },
    bottomText: {
      fontSize: 14,
      color: '#666666',
      margin: 10,
      position: 'absolute',
      bottom: 0,
      backgroundColor: '#FFFFFF',
      width :'100%',
      borderTopRightRadius: 20,
    },
    totalContainer: {
      backgroundColor: '#FFFFFF',
      padding: 15,
      marginHorizontal: 20,
      borderRadius: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 5,
      marginVertical: 10,
    },
    totalText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333333',
    },
    monthsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      backgroundColor: '#fff',
      height: height * 0.45,
    },
    sideContainerLeft: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    sideContainerRight: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-end',
      borderColor: 'green',
      marginLeft: 'auto',
      marginRight : width/100,
    },
    sideContainerTop: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexWrap: 'nowrap',
      width: '100%',
    },
    sideContainerBottom: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexWrap: 'nowrap',
      width: '100%',
      borderColor: 'blue',
      margin: 'auto',
    },
    middleContainer: {
      flexDirection: 'row',
      width: '100%',
      marginHorizontal: width/200,
    },
    middleMiddleContainer : {
      flexDirection : 'row',
      width :  width / 2,
      alignItems: 'center',
      justifyContent : 'space-between',
    },
    diceContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(250,0,0,1)',
      height: width * 0.15,
      width: width * 0.15,
      marginVertical: 'auto',
      borderRadius: 10,
    },
    controlContainer : {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#349742',
      height: width * 0.15,
      width: width * 0.15,
      marginVertical: 'auto',
      borderRadius:  width * 7.5,
    },
    monthItem: {
      width: width * 0.22,
      height: width * 0.12,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#346751',
      margin: 5,
      borderRadius: 5,
      marginVertical: height/150,
    },
    monthText: {
      fontSize: width/40,
      color: '#FFFFFF',
    },
    activeMonth: {
      backgroundColor: '#4E9F3D',
    },
    disabledMonth: {
      backgroundColor: 'rgba(52, 103, 81, 0.7)',
    },
    disabledControl: {
      backgroundColor: 'rgba(255, 255, 255, 0)',
    },
    negativeBalance : {
      backgroundColor : 'red',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal2Container:{
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal3Container:{
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      paddingTop : height/8,
    },
    TitreModal : {
      flexDirection : 'row',
      width : width,
      justifyContent : 'center',
    },
    modalFermer: {
      height :  height / 24,
      backgroundColor: 'rgba(255, 0, 0, 0.8)',
      width : height / 24,
      borderRadius : height / 12,
      position:'absolute',
      right : 0,
      justifyContent :'center',
      alignItems : 'center',
    },
    TabViews : {
      flexDirection : 'row',
      width : '100%',
      height : '100%',
    },
    modalContent2: {
      backgroundColor: '#FFFFFF',
      padding: 20,
      borderRadius: 10,
      width: '95%',
      alignItems: 'center',
    },
    modalOptTxt: {
      width:  '90%',
      height :  height / 18,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      padding : 10,
      margin : 5,
      justifyContent : 'center',
      alignItems: 'center',
      borderRadius : 10,
    },
    modalSuite: {
      width:  '90%',
      height :  height / 18,
      backgroundColor: 'green',
      padding : 10,
      margin : 5,
      justifyContent : 'center',
      alignItems: 'center',
      borderRadius : 10,
    },
    optionText2: {
      color: '#fff',
    },
    optionText3 : {
      fontWeight : 'bold',
    },
    tahiry: {
      flexDirection : 'row',
      width :'100%',
      alignItems : 'center',
      height : 'content',
      paddingVertical : height / 50,
    },
    hanampy: {
      width:  '40%',
      height :  height / 20,
      backgroundColor: 'green',
      justifyContent : 'center',
      alignItems: 'center',
      padding : 5,
      position : 'absolute',
      right : 0,
      borderRadius : 10,
    },
    hanampy2: {
      width:  '40%',
      height :  height / 15,
      backgroundColor: 'green',
      justifyContent : 'center',
      alignItems: 'center',
      padding : 5,
      borderRadius : 10,
    },
    ambanyTab : {
      position : "absolute",
      bottom:20,
      flexDirection : 'row',
      with : width,
      justifyContent : 'space-between',
    },
    annulerTxt : {
      color: 'red',
      fontWeight : 'bold',
    },
    modalContent: {
      backgroundColor: '#FFFFFF',
      padding: 20,
      borderRadius: 10,
      width: '80%',
      alignItems: 'center',
    },
    modalContent3: {
      backgroundColor: '#FFFFFF',
      padding: 0,
      borderRadius: 10,
      width: '100%',
      alignItems: 'center',
    },
    IMFcontent : {
      width: '90%',
      alignItems: 'center',
      backgroundColor: 'rgba(200,200,200,0.5)',
      padding: 20,
      borderRadius: 10,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      width: '100%',
      borderBottomWidth: 1,
      marginBottom: 20,
      padding: 5,
      fontSize: 16,
    },
    list: {
      flex: 1,
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#CCCCCC',
    },
    listItemStock: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderWidth: 1,
      borderBottomColor: '#CCCCCC',
    },
    itemText: {
      fontSize: 14,
      color: '#666666',
      marginLeft: 10,
    },
    icon: {
      marginRight: 10,
    },
    itemDetails: {
      flex: 1,
    },
    itemDescription: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333333',
    },
    itemAmount: {
      fontSize: 14,
      color: '#666666',
    },
    itemActions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    emptyListText:{
      marginTop: '30%',
      color: '#ccc',
      fontSize : height / 40,
    },
    contenuDuStock : {
      backgroundColor : '#fff',
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    elementtabview : {
  paddingTop : height /50,
   flex : 1,
   backgroundColor : 'white',
   alignItems  : 'center',
   textAlign : 'center',
    },
  });
  export default styles;