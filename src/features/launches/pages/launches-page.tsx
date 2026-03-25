import { useLaunches } from "../hooks/use-launches"
import { Box, Text, Image, Grid } from "@chakra-ui/react"

export function LaunchesPage() {
    const { data, isLoading, error } = useLaunches({ page: 1 })

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error...</p>

    const placeholderSrc = "/launch-placeholder.png"

    return (
        <div>
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                {data?.docs.map((launch: any) => {
                    const patchSmall = launch.links?.patch?.small
                    const patchLarge = launch.links?.patch?.large
                    const flickrFirst = launch.links?.flickr?.original?.[0]
                    const imageSrc =
                        patchSmall || patchLarge || flickrFirst || placeholderSrc

                    return (
                        <Box key={launch.id} p={4} borderWidth="1px" borderRadius="md">
                            <Image rounded="md" src={imageSrc} alt={launch.name} />
                            <Text fontWeight="bold">{launch.name}</Text>
                            <Text fontSize="sm">
                                {new Date(launch.date_utc).toLocaleDateString()}
                            </Text>
                        </Box>
                    )
                })}
            </Grid>
        </div>
    )
}