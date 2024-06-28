import { describe, it, expect, jest } from '@jest/globals'
import Person from '../src/person'


describe('#Person Suite', () => {
    describe('#validate', () => {
        it('shoult thorw if the name is not present', () => {
            const mockInvalidPerson = {
                name: '',
                cpf: '123.456.789-00'
            }

            const result = () => Person.validate(mockInvalidPerson)
            expect(result).toThrow(new Error('name is required'))
        })

        it('shoult thorw if the cpf is not present', () => {
            const mockInvalidPerson = {
                name: 'Xuxa da Silva',
                cpf: ''
            }

            const result = () => Person.validate(mockInvalidPerson)
            expect(result).toThrow(new Error('cpf is required'))
        })

        it('shoult not thorw person is valid', () => {
            const mockPerson = {
                name: 'Xuxa da Silva',
                cpf: '123.456.789-00'
            }

            const result = () => Person.validate(mockPerson)
            expect(result).not.toThrow()
        })
    })

    describe('#format', () => {
        it('shoult format the person name and CPF', () => {
            const mockPerson = {
                name: 'Xuxa da Silva',
                cpf: '123.456.789-00'
            }

            const formattedPerson = Person.format(mockPerson);

            const expected = {
                name: 'Xuxa',
                lastName: 'da Silva',
                cpf: '12345678900'
            }

            expect(formattedPerson).toStrictEqual(expected)
        })
    })

    describe('#save', () => {
        it('shoult thorw if the name is not present', () => {
            const mockInvalidPerson = {
                lastName: 'da Silva',
                cpf: '12345678900'
            }
           
            const formattedPerson = () =>  Person.save(mockInvalidPerson);

            expect(formattedPerson)
            .toThrow(
                new Error(`cannot save invalid person: ${JSON.stringify(mockInvalidPerson)}`)
            )
        })

        it('shoult thorw if the cpf is not present', () => {
            const mockInvalidPerson = {
                name: 'Xuxa',
                lastName: 'da Silva'
            }
           
            const formattedPerson = () =>  Person.save(mockInvalidPerson);

            expect(formattedPerson)
            .toThrow(
                new Error(`cannot save invalid person: ${JSON.stringify(mockInvalidPerson)}`)
            )
        })

        it('shoult thorw if the lastName is not present', () => {
            const mockInvalidPerson = {
                name: 'Xuxa da Silva',
                cpf: '12345678900'
            }
           
            const formattedPerson = () =>  Person.save(mockInvalidPerson);

            expect(formattedPerson)
            .toThrow(
                new Error(`cannot save invalid person: ${JSON.stringify(mockInvalidPerson)}`)
            )
        })
    })

    describe('#process', () => {
        it('shoult process a valid person', () => {
            const mockPerson = {
                name: 'Xuxa da Silva',
                cpf: '123.456.789-00'
            }

            jest.spyOn(
                Person,
                Person.validate.name
            ).mockReturnValue()

            jest.spyOn(
                Person,
                Person.format.name
            ).mockReturnValue({
                name: 'Xuxa',
                lastName: 'da Silva',
                cpf: '12345678900'
            })

            const result = Person.process(mockPerson)

            const expected = 'ok'

            expect(result).toStrictEqual(expected)
        })
    })
})
