import { Button, Card, Container, Grid, Text } from '@nextui-org/react';
import { GetStaticProps, NextPage, GetStaticPaths } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { pokeApi } from '../../api';
import { Layout } from '../../components/layouts'
import { Pokemon } from '../../interfaces/pokemon-full';
import { getPokemonInfo, localFavorites } from '../../utils';

import confetti from 'canvas-confetti'
import { PokemonListResponse } from '../../interfaces';

interface Props{
    pokemon: Pokemon;
}

const PokemonByName: NextPage<Props> = ({pokemon}) => {


    const [isInFavorites, setIsInFavorites] = useState(localFavorites.existInFavorites(pokemon.id))
    const router = useRouter();
    // console.log(router.query);

    const onToggleFavorite = () => {
        localFavorites.toggleFavorite(pokemon.id)
        setIsInFavorites(!isInFavorites)

        if (!isInFavorites){
            confetti({
                zIndex: 999,
                particleCount: 100,
                spread: 160,
                angle: -100,
                origin: {
                    x: 0.5,
                    y: 0.5
                }
            })
        }
    }

    useEffect(() => {
      
    }, [])
    

    return (
        <Layout title={pokemon.name}>
           <Grid.Container css={{marginTop: '5px'}} gap={2}>
                <Grid xs={12} sm={4}>
                    <Card hoverable css={{padding: '30px'}}>
                        <Card.Body>
                            <Card.Image src={pokemon.sprites.other?.dream_world.front_default || 'no-image.png'}
                                        alt={pokemon.name} width="100%"
                                        height={200}>

                            </Card.Image>
                        </Card.Body>
                    </Card>
                </Grid>
                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header css={{display: 'flex', justifyContent:'space-between'}}>
                            <Text h1 transform="capitalize">
                                {pokemon.name}
                            </Text>
                            <Button onClick={onToggleFavorite} color="gradient" ghost={!isInFavorites}>
                                {isInFavorites ? 'In favorites' : 'Add to favorites'}
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Text size={30}>
                                Sprites:
                            </Text>
                            <Container direction="row" display="flex" gap={0}>
                                <Image src={pokemon.sprites.front_default}
                                        alt={pokemon.name}
                                        width={100}
                                        height={100} />
                                <Image src={pokemon.sprites.back_default}
                                        alt={pokemon.name}
                                        width={100}
                                        height={100} />
                                <Image src={pokemon.sprites.front_shiny}
                                        alt={pokemon.name}
                                        width={100}
                                        height={100} />
                                <Image src={pokemon.sprites.back_default}
                                        alt={pokemon.name}
                                        width={100}
                                        height={100} />
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
           </Grid.Container>
        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

    const pokemonNames: string[] = data.results.map( pokemon => pokemon.name)

    return {
        paths: pokemonNames.map( name => ({
            params: { name }
        })),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {

    const { name } = ctx.params as {name: string};

    return {
        props: {
            pokemon: await getPokemonInfo(name)
        }
    }
}


export default PokemonByName