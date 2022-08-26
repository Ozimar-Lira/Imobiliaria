import React, {Component} from 'react';
import {View, Text, Image, Button} from 'react-native';

export default class ItemImovel extends Component {
  verificarExcluir() {
    if (this.props.excluir) {
      return (
        <View style={{flex: 1}}>
          <Button
            title="Excluir"
            onPress={() => {
              this.props.excluir(this.props.id);
            }}></Button>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={{flexDirection: 'row', padding: 10}}>
        <View style={{flex: 1}}>
          <Image
            style={{height: 80, marginRight: 10}}
            source={{uri: this.props.imagem}}
          />
        </View>
        <View style={{flex: 1}}>
          <Text>Endereco: {this.props.endereco} </Text>
          <Text>Finalidade: {this.props.finalidade}</Text>
          <Text>Tipo: {this.props.tipo}</Text>
          <Text>Valor: {this.props.valor}</Text>
        </View>

        {this.verificarExcluir()}
      </View>
    );
  }
}
