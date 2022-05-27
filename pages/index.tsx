import { GetStaticProps } from 'next'
import type { NextPage } from 'next'
import { Layout } from '../components/layouts'
import { pokeApi } from '../api';
import { PokemonListResponse, SmallPokemon } from '../interfaces';
import { Grid } from '@nextui-org/react';
import { PokemonCard } from '../components/pokemon';

interface Props {
    pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({pokemons}) => {
    return (
        <Layout title="Listado de pokemons">
            <Grid.Container gap={2} justify="flex-start">
                {
                    pokemons.map((pokemon) => (
                        <Grid xs={6} sm={3} md={2} xl={1} key={pokemon.id}>
                            <PokemonCard key={pokemon.id} pokemon={pokemon} />
                        </Grid>
                    ))
                }
            </Grid.Container>
        </Layout>
    )
}

export default HomePage

export const getStaticProps: GetStaticProps = async (ctx) => {
    const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')
        
    const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
        ...poke,
        id: i + 1,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i+1}.svg`
    }))

    return {
        props: {
            pokemons: pokemons
        }
    }
}