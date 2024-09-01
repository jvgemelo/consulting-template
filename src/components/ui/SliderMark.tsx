import { Box, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack } from "@chakra-ui/react"
import { useState } from "react"

export default function SliderMarkExample() {
    const [sliderValue, setSliderValue] = useState(2.5)  // Inicia el valor en el medio (2.5)
  
    const labelStyles = {
      mt: '2',
      ml: '-2.5',
      fontSize: 'sm',
    }
  
    return (
      <Box p={4} pt={6}>
        <Slider
          aria-label='slider-ex-6'
          min={0}
          max={5}
          step={0.01}
          value={sliderValue}
          onChange={(val) => setSliderValue(val)}
        >
          {/* <SliderMark value={0} {...labelStyles}>
            0.00
          </SliderMark> */}
          <SliderMark value={1.25} {...labelStyles}>
            1.25
          </SliderMark>
          <SliderMark value={2.5} {...labelStyles}>
            2.50
          </SliderMark>
          <SliderMark value={3.75} {...labelStyles}>
            3.75
          </SliderMark>
          {/* <SliderMark value={5} {...labelStyles}>
            5.00
          </SliderMark> */}
          <SliderMark
            value={sliderValue}
            textAlign='center'
            bg='blue.500'
            color='white'
            mt='-10'
            ml='-5'
            w='12'
          >
            {sliderValue.toFixed(2)}  {/* Mostrar el valor con dos decimales */}
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>
    )
  }
