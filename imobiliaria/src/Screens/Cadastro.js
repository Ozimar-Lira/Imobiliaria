import React, {Component, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {RNCamera} from 'react-native-camera';
import ItemImovel from '../Components/ItemImovel';

import Database from '../Database/Database';
import Imovel from '../Models/Imovel';

export default class Cadastro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endereco: 'EM BRANCO',
      finalidade: 'EM BRANCO',
      tipo: 'EM BRANCO',
      valor: 0,
      imagem: '',
    };
    // const [language, setLanguage] = useState('');
    //this.CadastrarBanco('Batmóvel', 'HotWheels', 2005, 'https://cf.shopee.com.br/file/dd9bfd306cbaa926a7b23f6d568cd103')
  }

  CadastrarBanco = (endereco, finalidade, titpo, valor, imagem) => {
    const banco = new Database();
    const imovel = new Imovel(null, endereco, finalidade, titpo, valor, imagem);
    banco.Inserir(imovel);
  };

  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
      this.setState({imagem: data.uri});
    }
  };

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={styles.container}></View>
        <View style={{flex: 1}}>
          <Text></Text>
          <TextInput
            onChangeText={valor => {
              this.setState({endereco: valor});
            }}
            placeholder="Digite o endereço..."
          />
          <Text></Text>
          <RNPickerSelect
            placeholder={{label: 'Selecione a finalidade', value: null}}
            onValueChange={value => {
              this.setState({finalidade: value});
            }}
            items={[
              {label: 'Aluguel', value: 'Aluguel'},
              {label: 'Venda', value: 'Venda'},
            ]}
          />
          <Text></Text>
          <RNPickerSelect
            placeholder={{label: 'Selecione o tipo de imóvel', value: null}}
            onValueChange={value => {
              this.setState({tipo: value});
            }}
            items={[
              {label: 'Casa', value: 'Casa'},
              {label: 'Apartamento', value: 'Apartamento'},
              {label: 'Comercio', value: 'Comercio'},
            ]}
          />
          <Text></Text>

          <TextInput
            onChangeText={valor => {
              this.setState({valor: valor});
            }}
            placeholder="Digite o valor..."
          />
          <Text></Text>
        </View>

        <View style={styles.container}>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'Permission to use audio recording',
              message: 'We need your permission to use your audio',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            onGoogleVisionBarcodesDetected={({barcodes}) => {
              console.log(barcodes);
            }}
          />
        </View>
        <Text></Text>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity onPress={this.takePicture.bind(this)}>
            <Text style={{fontSize: 14}}>Tirar foto </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.CadastrarBanco(
                this.state.endereco,
                this.state.finalidade,
                this.state.tipo,
                this.state.valor,
                this.state.imagem,
              )
            }>
            <Text
              style={{
                backgroundColor: 'purple',
                width: 150,
                textAlign: 'center',
                padding: 10,
                margin: 5,
                color: 'white',
                borderRadius: 50,
              }}>
              Cadastrar
            </Text>
          </TouchableOpacity>
          <Text></Text>
        </View>

        <View style={{flex: 1}}>
          <Text style={{textAlign: 'center'}}>
            O Imovel será cadastrado com os seguintes dados:
          </Text>

          <ItemImovel
            endereco={this.state.endereco}
            finalidade={this.state.finalidade}
            tipo={this.state.tipo}
            valor={this.state.valor}
            imagem={this.state.imagem}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    flex: 1,
    height: 50,
  },
  preview: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 250,
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
