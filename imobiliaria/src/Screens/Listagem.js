import React, {Component} from 'react';
import {View, Text} from 'react-native';

import ItemImovel from '../Components/ItemImovel';
import Database from '../Database/Database';

export default class Listagem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaImoveis: [],
    };
    this.ListarBanco();
  }

  ListarBanco = () => {
    const banco = new Database();
    banco.Listar().then(lista => {
      this.setState({listaImoveis: lista});
    });
  };

  ExcluirBanco = id => {
    const banco = new Database();
    banco.Remover(id);
    this.ListarBanco();
  };

  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.listaImoveis.map(item => (
          <ItemImovel
            key={item.id}
            id={item.id}
            endereco={item.endereco}
            finalidade={item.finalidade}
            tipo={item.tipo}
            valor={item.valor}
            imagem={item.imagem}
            excluir={this.ExcluirBanco}
          />
        ))}
      </View>
    );
  }
}
