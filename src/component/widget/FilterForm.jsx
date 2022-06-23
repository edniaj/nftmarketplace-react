import { Button, FormControl, FormControlLabel, FormHelperText, InputAdornment, InputLabel, OutlinedInput, Typography } from '@material-ui/core'
import { Box } from '@mui/system'
import React from 'react'
import { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import ListIcon from '@mui/icons-material/List';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';


const sxField = {
    bgcolor: 'background.paper',
    boxShadow: 1,
    borderRadius: 2,
}

const sxBox = {
    height: '64px',
    padding: '20px',
    cursor: 'pointer'
}

const sxCheckbox = {
    height: '42px',
    paddingLeft: "10px"
}

function FilterForm(props) {

    const [showCategory, setShowCategory] = useState([])

    let { formData, setFormData, traitStats } = props.manageForm

    // temp value to testing



    const handleChange = e => {
        let clone = { ...formData }
        clone[e.target['name']] = e.target.value
        setFormData(clone)
    }

    const handleOnlyListed = e => {
        let clone = {...formData}
        if (clone.hasOwnProperty('onlyListed') ) {
            clone['onlyListed'] = !clone['onlyListed']
        } else {
            clone[`onlyListed`] = true
        }
        setFormData(clone)
    }

    const generateCategory = () => {
        let renderList = Object.keys(traitStats).map((traitType, i) => {

            return (
                <React.Fragment key={i}>
                    <Paper variant="outlined" square sx={sxBox}
                        onClick={async () => {
                            // Toggles state by dynamically generating annoymous function
                            await showCategory.includes(traitType) ? setShowCategory([...showCategory].filter(item => item !== traitType)) : setShowCategory([...showCategory, traitType]);
                        }}
                    >
                        <Box sx={{ display: 'flex' }}>
                            <ListIcon sx={{ marginRight: "20px" }} />
                            <Typography variant="h6" >
                                {traitType}
                            </Typography>
                        </Box>
                    </Paper>
                    {showCategory.includes(traitType) &&
                        <Box>
                            <FormGroup>
                                {Object.keys(traitStats[traitType]).map(traitValue =>
                                    < >
                                        <FormControl>
                                            <Box sx={{ display: 'flex' }}>
                                                <Box sx={sxCheckbox}>
                                                    <FormControlLabel label=
                                                        {traitValue}
                                                        control={
                                                            <Checkbox
                                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}
                                                                checked={formData[traitType] ? formData[traitType].includes(traitValue) : false}
                                                                onChange={async () => {
                                                                    let clone = { ...formData };
                                                                    clone = clone[traitType] ? { ...clone } : { ...clone, [traitType]: [] }; // checks if traitType key exist (normalize)
                                                                    clone[traitType].includes(traitValue) ? clone[traitType] = clone[traitType].filter(x => x !== traitValue) : clone[traitType].push(traitValue)
                                                                    // console.log(clone)
                                                                    setFormData(clone)
                                                                }}

                                                            />}

                                                    />

                                                </Box>
                                                <Box sx={{ marginLeft: "auto", marginRight: "15px", marginTop: "5px" }}>
                                                    <Typography>
                                                        {traitStats[traitType][traitValue]}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </FormControl>
                                    </>
                                )}
                            </FormGroup>
                        </Box>}

                </React.Fragment >


            )
        })

        return renderList
    }



    const validatePrice = (name) => {

        let minValue = parseInt(formData['minimum'])
        let maxValue = parseInt(formData['maximum'])

        if (name === `minimum`) {
            return maxValue ? minValue > maxValue : false
        }
        if (name === `maximum`) {
            return minValue ? maxValue < minValue : false
        }
    }

    return (
        <>

            <Box>
                <Typography variant='body2' color='textSecondary'>Please wait for filter menu to load</Typography>
                <Typography variant='body2' color='textSecondary'>Takes 10-20 seconds</Typography>
                <Stack gap={5}>
                    <Typography>
                        Price
                    </Typography>
                    <Box sx={sxCheckbox}>
                        <FormControlLabel label="Only listed"
                            control={
                                <Checkbox
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}
                                    checked={formData['onlyListed'] ? formData['onlyListed'] : false}
                                    onChange={handleOnlyListed}

                                />}

                        />

                    </Box>
                    <FormControl sx={sxField}>
                        <InputLabel htmlFor="outlined-adornment-amount">minimum price</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            name="minimum"
                            value={formData['minimum'] ? formData['minimum'] : ''}
                            onChange={handleChange}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            label="Amount"
                            error={validatePrice('minimum')}
                        />
                        <FormHelperText sx={{ color: 'indianred' }}>
                            {validatePrice('minimum') && `minimum price must be below maximum`}
                        </FormHelperText>

                    </FormControl>
                    <FormControl sx={sxField}>
                        <InputLabel htmlFor="outlined-adornment-amount">maximum price</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            name="maximum"
                            value={formData['maximum'] ? formData['maximum'] : ''}
                            onChange={handleChange}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            error={validatePrice('maximum')}
                            label="Amount"
                        />
                        <FormHelperText sx={{ color: 'indianred' }}>
                            {validatePrice('maximum') && `maximum price must be below minimum`}
                        </FormHelperText>
                    </FormControl>


                </Stack>
                {generateCategory()}
            </Box>
        </>
    )
}

export default FilterForm