import logo from '@/../public/osten_moove.svg';
import { Image } from '@nextui-org/image';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';
import { signUp } from '@/services/modules/auth';
import { useState } from 'react';

export default function IndexPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignUp = async () => {
    const response = await signUp({ firstName, lastName, email, password });

    console.log(response);
  };

  return (
    <main className='w-full flex h-full'>
      <div className='w-3/5 flex flex-col h-full bg-[#F5F5F5]'>
        <div className='h-1/3 p-10 w-full flex justify-start'>
          <Image src={logo} width={300} height={0} />
        </div>
        <div className='h-1/3 p-10 w-full flex flex-col'>
          <h1 className='text-3xl font-semibold text-gray-600 mb-10 px-5'>Login com a sua conta</h1>
          <div className='flex flex-col gap-2'>
            <Input size='md' variant='flat' label='Email' radius='lg' />
            <Input size='md' variant='flat' label='Senha' radius='lg' type='password' />
          </div>
        </div>
        <div className='h-1/3'></div>
      </div>

      <div className='w-2/5 h-full bg-[#33bcff] flex items-center shadow-2xl shadow-[#33bcff]'>
        <div className='flex flex-col gap-5 p-10 items-center w-full'>
          <h1 className='text-3xl font-semibold text-white'>Primeira vez aqui?</h1>
          <Button className='p-8 bg-white w-[200px]' size='lg' radius='full' onPress={onOpen}>
            <span className='font-semibold'>Cadastre-se</span>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className='flex flex-col gap-1 text-gray-700 text-xl'>Cadastre-se</ModalHeader>
                    <ModalBody>
                      <div className='h-1/3 p-3 w-full flex flex-col'>
                        <h2 className='text-xl font-semibold text-gray-600 mb-5'>Insira as informações abaixo</h2>
                        <div className='flex flex-col gap-2'>
                          <Input
                            size='sm'
                            variant='flat'
                            label='Nome'
                            radius='lg'
                            value={firstName}
                            onValueChange={setFirstName}
                          />
                          <Input
                            size='sm'
                            variant='flat'
                            label='Sobrenome;'
                            radius='lg'
                            value={lastName}
                            onValueChange={setLastName}
                          />
                          <Input
                            size='sm'
                            variant='flat'
                            label='Email'
                            radius='lg'
                            type='email'
                            value={email}
                            onValueChange={setEmail}
                          />
                          <Input
                            size='sm'
                            variant='flat'
                            label='Senha'
                            radius='lg'
                            type='password'
                            value={password}
                            onValueChange={setPassword}
                          />
                        </div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color='danger' variant='light' onPress={onClose}>
                        Cancelar
                      </Button>
                      <Button color='primary' onPress={handleSignUp}>
                        Cadastrar-se
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </Button>
        </div>
      </div>
    </main>
  );
}
