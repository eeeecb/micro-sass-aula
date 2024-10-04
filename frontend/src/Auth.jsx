'use client'

import React, { useState, useEffect } from 'react'
import { User, Lock, UserPlus } from 'lucide-react'

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [nome, setNome] = useState('')
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify([]))
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('users'))

    if (isLogin) {
      const user = users.find((u) => u.login === login && u.senha === senha)
      if (user) {
        onLogin(user)
      } else {
        setError('Login ou senha inválida')
      }
    } else {
      if (users.some((u) => u.login === login)) {
        setError('Login já existe')
      } else {
        const newUser = { nome, login, senha }
        localStorage.setItem('users', JSON.stringify([...users, newUser]))
        setIsLogin(true)
        setError('Cadastro realizado com sucesso. Por favor, faça login.')
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-6">
          {isLogin ? 'Login' : 'Cadastro'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label htmlFor="nome" className="block mb-1">
                Nome
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}
          <div>
            <label htmlFor="login" className="block mb-1">
              Login
            </label>
            <div className="relative">
              <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                id="login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="senha" className="block mb-1">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {isLogin ? 'Entrar' : 'Cadastrar'}
          </button>
        </form>
        <p className="mt-4 text-sm">
          {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-1 text-blue-400 hover:underline"
          >
            {isLogin ? 'Cadastre-se' : 'Faça login'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default Auth