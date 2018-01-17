import React, { Component } from 'react';

import logo from './logo.svg';
import './NewAccount.css';
import { validateSixCharacters, validateUppercaseLetter, validateOneNumber } from './validation';

class NewAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            touched: {
                password: false,
            },
            validate: {
                password: {
                    sixCharacters: true,
                    uppercaseLetter: true,
                    oneNumber: true 
                }
            }
        };
    }

    validate = () => {
        const { password } = this.state;
        this.setState( prevState => ({
            ...prevState,
            validate: {
                password: {
                    sixCharacters: validateSixCharacters(password),
                    uppercaseLetter: validateUppercaseLetter(password),
                    oneNumber: validateOneNumber(password) 
                }
            }
        }));
    }

    handleChange = (field) => (event) => {
        this.setState({ [field]: event.target.value }, () => {
            this.validate();
        });
    }

    handleBlur = (field) => (event) => {
        this.setState( prevState => ({ 
            ...prevState,
            touched: {
                [field]: true
            }
        }), () => {
            this.validate();
        });
    }

    setClassDescription = (validatePassword, classError, classSuccess) => {
        if (!this.hasPassword()) return
        if (validatePassword) {
            return classError
        }
        return classSuccess;
    }

    setClassBar = () => {
        if (this.countTrueValidates() === 0) { return 'validate-bar__high' }
        else if (this.countTrueValidates() === 1) { return 'validate-bar__average' }
        else if (this.countTrueValidates() === 2) { return 'validate-bar__low' }
        return 'validate-bar__low';
    }

    setClassInput = () => {
        const { password } = this.state;
        if (password) {
            if (this.countTrueValidates() === 0) { return 'validate-input__high' }
            else if (this.countTrueValidates() === 1) { return 'validate-input__low-average' }
            else if (this.countTrueValidates() === 2) { return 'validate-input__low-average' }
            return 'validate-input__low-average';
        }
        
    }

    hasPassword = () => {
        const { password } = this.state;
        if (password) return true;
        return false;
    }

    countTrueValidates = () => {
        const { validate } = this.state;
        const filterTrue = Object.values(validate.password).filter(result => result === true);
        return filterTrue.length;
    }

    render() {
        const { 
            fullName, 
            email, 
            password, 
            confirmPassword, 
            touched, 
            validate 
        } = this.state;
        return (
            <div className="new-account">
                <div class="new-account__logotype">
                    <img src={logo} className="new-account__logotype-img" alt="logo" />
                </div>
                <div className="new-account__title">Crie sua conta</div>
                <form>
                        <div className="form-group">
                            <label htmlFor="fullName">Nome completo</label>
                            <input 
                                className="form-input"
                                type="text" 
                                name="fullName"
                                onChange={this.handleChange('fullName')}
                                value={fullName}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <input 
                                className="form-input"
                                type="text" 
                                name="email"
                                onChange={this.handleChange('email')}
                                value={email}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Senha</label>
                            <input 
                                className={`form-input validate-input ${(this.setClassInput())}`}
                                type="password" 
                                name="password"
                                placeholder="Digite sua senha"
                                onChange={this.handleChange('password')}
                                onBlur={this.handleBlur('password')}
                                value={password}
                            />
                            <div className={`validate-bar ${(this.setClassBar())}`}>
                                <div className={`bar ${(this.countTrueValidates() <= 3 && password && 'highlight-bar')}` }></div>
                                <div className={`bar ${(this.countTrueValidates() <= 1 && 'highlight-bar')}` }></div>
                                <div className={`bar ${(this.countTrueValidates() <= 0 && 'highlight-bar')}` }></div>
                            </div>
                            <ul className="validate-description">
                                <li 
                                    className={ 
                                        this.setClassDescription(validate.password.sixCharacters, 
                                        'six-characters__error', 
                                        'six-characters__success') 
                                }>
                                    Pelo menos 6 caracteres
                                </li>
                                <li 
                                    className={ 
                                        this.setClassDescription(validate.password.uppercaseLetter, 
                                        'uppercase__error', 
                                        'uppercase__success') 
                                }>
                                    Pelo menos 1 letra maiúscula
                                </li>
                                <li className={
                                        this.setClassDescription(validate.password.oneNumber, 
                                        'one-number one-number__error', 
                                        'one-number one-number__success') 
                                }>
                                    Pelo menos 1 número
                                </li>
                            </ul>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Confirme sua senha</label>
                            <input 
                                className="form-input"
                                type="text" 
                                name="confirmPassword"
                                onChange={this.handleChange('confirmPassword')}
                                value={confirmPassword}
                            />
                        </div>
                        <button type="submit" className="button button-success">
                            Criar conta
                        </button>
                </form>
            </div>
        );
    }
}

export default NewAccount;