export const ownerTypes = [
    {value: '1', name: 'Federal'},
    {value: '2', name: 'State'},
    {value: '3', name: 'County'},
    {value: '4', name: 'City'},
    {value: '5', name: 'Town'},
    {value: '6', name: 'Village'},
    {value: '7', name: 'Mixed Government'},
    {value: '8', name: 'Private'},
    {value: '9', name: 'Public School District or BOCES'},
    {value: '10', name: 'Road Right of Way'},
    {value: '-999', name: 'Unknown'}
];

export const propTypes = [
    {value: '100', name: 'Agricultural'},
    {value: '105', name: 'Agricultural Vacant Land (Productive)'},
    {value: '110', name: 'Livestock and Products'},
    {value: '111', name: 'Poultry and Poultry Products: eggs, chickens, turkeys, ducks and geese'},
    {value: '112', name: 'Dairy Products : Milk, butter and cheese'},
    {value: '113', name: 'Cattle, Calves and hogs'},
    {value: '114', name: 'Sheep and wool'},
    {value: '115', name: 'Honey and Beeswax'},
    {value: '116', name: 'Other livestock : Donkeys and goats'},
    {value: '117', name: 'Horse Farms'},
    {value: '120', name: 'Field Crops'},
    {value: '129', name: 'Acquired Development Rights'},
    {value: '130', name: 'Truck Crops - Mucklands'},
    {value: '140', name: 'Truck crops - Not mucklands'},
    {value: '150', name: 'Orchard crops'},
    {value: '151', name: 'Apples,Pears,Peaches,Cherries,etc'},
    {value: '152', name: 'Vineyards'},
    {value: '160', name: 'Other fruits'},
    {value: '170', name: 'Nursery and greenhouse'},
    {value: '180', name: 'Speciality farms'},
    {value: '181', name: 'Fur Products:mink,chinchilla,etc'},
    {value: '182', name: 'Pheasant etc'},
    {value: '183', name: 'Aquatic: oysterlands,fish and aquatic plants'},
    {value: '184', name: 'Livestock: deer,moose,llamas,buffalo,etc'},
    {value: '190', name: 'Fish,game and wildlife preserves'},
    {value: '200', name: 'Residential'},
    {value: '210', name: 'One family year-round Residential'},
    {value: '215', name: 'One family year-round Residential with accessory apartment'},
    {value: '220', name: 'Two family year around Residential'},
    {value: '230', name: 'Three family year around Residential'},
    {value: '240', name: 'Rural Residential with Acreage'},
    {value: '241', name: 'Primary Residential,also used in agricultural production'},
    {value: '242', name: 'Recreational use'},
    {value: '250', name: 'Estate'},
    {value: '260', name: 'Seasonal Residentials'},
    {value: '270', name: 'Mobile home'},
    {value: '271', name: 'Multiple mobile homes'},
    {value: '280', name: 'Residential - Multi-Purpose/Multi-Structure'},
    {value: '281', name: 'Multiple Residentials'},
    {value: '283', name: 'Residential with Incidental commercial use'},
    {value: '300', name: 'Vacant land'},
    {value: '310', name: 'Residential'},
    {value: '311', name: 'Residential Vacant land'},
    {value: '312', name: 'Residential land including a small improvement(not used for living accommodation)'},
    {value: '314', name: 'Rural Vacant lots of 10 acres or less'},
    {value: '315', name: 'Underwater vacant land'},
    {value: '320', name: 'rural'},
    {value: '321', name: 'Abandoned Agricultural land'},
    {value: '322', name: 'Residential vacant land over 10 acres'},
    {value: '323', name: 'Other rural vacant lands'},
    {value: '330', name: 'Vacant land located in commercial areas'},
    {value: '331', name: 'Commercial vacant land with minor improvements'},
    {value: '340', name: 'Vacant land located in Industrial areas'},
    {value: '341', name: 'Industrial vacant land with minor improvements'},
    {value: '350', name: 'Urban renewal or slum clearance'},
    {value: '351', name: 'Shell building - resvalueential'},
    {value: '352', name: 'Shell building - commercial'},
    {value: '380', name: 'Public utility vacant land'},
    {value: '400', name: 'Commercial'},
    {value: '410', name: 'Living accommodations'},
    {value: '411', name: 'Apartments'},
    {value: '414', name: 'Hotel'},
    {value: '415', name: 'Motel'},
    {value: '416', name: 'Mobile home parks(trailer parks,trailer courts)'},
    {value: '417', name: 'Camps,cottages and bungalows'},
    {value: '418', name: 'Inns,lodges,Boarding and rooming houses, Tourist homes, Fraternity and Sorority houses'},
    {value: '420', name: 'Dining Establishments'},
    {value: '421', name: 'Restaurants'},
    {value: '422', name: 'Diners and luncheonettes'},
    {value: '423', name: 'Snack bars,Drive-ins,ice cream bars'},
    {value: '424', name: 'Night clubs'},
    {value: '425', name: 'bar'},
    {value: '426', name: 'Fast food franchises'},
    {value: '430', name: 'Motor Vehicle Services'},
    {value: '431', name: 'Auto dealers-Sales and service'},
    {value: '432', name: 'Service and Gas stations'},
    {value: '433', name: 'Auto body,Tire shops,Other related auto sales'},
    {value: '434', name: 'Automatic car wash'},
    {value: '435', name: 'Manual Car wash'},
    {value: '436', name: 'Self-service car wash'},
    {value: '437', name: 'Parking garage'},
    {value: '438', name: 'Parking lot'},
    {value: '439', name: 'Small parking garage'},
    {value: '440', name: 'Storage, warehouse and Distribution facilities'},
    {value: '441', name: 'Fuel Storage and distribution facilities'},
    {value: '442', name: 'Mini warehouse(self storage'},
    {value: '443', name: 'Grain and feed elevators,Mixers,Sales outlets'},
    {value: '444', name: 'Lumber yards , Sawmills'},
    {value: '445', name: 'Coal yards,Bins'},
    {value: '446', name: 'Cold storage facilities'},
    {value: '447', name: 'Trucking terminals'},
    {value: '448', name: 'Piers,Wharves,Docks and Related facilities'},
    {value: '449', name: 'Other storage, warehouse and distribution facilities'},
    {value: '450', name: 'Retail Services'},
    {value: '451', name: 'Regional Shopping centers'},
    {value: '452', name: 'Area or neighborhood shopping centres'},
    {value: '453', name: 'Large retail outlets'},
    {value: '454', name: 'Large retail food stores'},
    {value: '455', name: 'Dealerships-Sales and Service(other than auto with large sales operation'},
    {value: '460', name: 'Banks and Office buildings'},
    {value: '461', name: 'Standard Bank/Single occupant'},
    {value: '462', name: 'Drive-in branch bank'},
    {value: '463', name: 'Bank complex with office building'},
    {value: '464', name: 'office building'},
    {value: '465', name: 'Professional building'},
    {value: '470', name: 'Miscellaneous services'},
    {value: '471', name: 'Funeral homes'},
    {value: '472', name: 'Dog kennels,Veterinary clinics'},
    {value: '473', name: 'Greenhouses'},
    {value: '474', name: 'Billboards'},
    {value: '475', name: 'Junkyards'},
    {value: '480', name: 'Multiple use or Multi-purpose'},
    {value: '481', name: 'Downtown row Type(with common wall)'},
    {value: '482', name: 'Downtown row type(detached)'},
    {value: '483', name: 'converted resvalueence'},
    {value: '484', name: 'One story small structure'},
    {value: '485', name: 'One story small structure-Multi occupant'},
    {value: '486', name: 'Minimart'},
    {value: '500', name: 'Recreation and Entertainment'},
    {value: '510', name: 'Entertainment Assembly'},
    {value: '511', name: 'Legitimate theaters'},
    {value: '512', name: 'Motion pictures theatres(excludes drive-in theatres'},
    {value: '513', name: 'Drive-in theatres'},
    {value: '514', name: 'Auditoriums,exhibition and Exposition halls'},
    {value: '515', name: 'Radio,T.V and Motion picture studios'},
    {value: '520', name: 'Sports assembly'},
    {value: '521', name: 'Stadiums,arenas,armories,Field houses'},
    {value: '522', name: 'Racetracks'},
    {value: '530', name: 'Amusement Facilities'},
    {value: '531', name: "Fairgrounds"},
    {value: '532', name: 'Amusement parks'},
    {value: '533', name: 'Game farms'},
    {value: '534', name: 'Social organizations'},
    {value: '540', name: 'Indoor sports facilities'},
    {value: '541', name: 'Bowling centers'},
    {value: '542', name: 'Ice or roller skater rinks'},
    {value: '543', name: 'YMCAs,YWCAs,etc'},
    {value: '544', name: 'Health spas'},
    {value: '545', name: 'Indoor swimming pools'},
    {value: '546', name: 'other Indoor sports'},
    {value: '550', name: 'Outdoor Sports activities'},
    {value: '551', name: 'Skiing centers'},
    {value: '552', name: 'Public golf courses'},
    {value: '553', name: 'Private Golf Country clubs'},
    {value: '554', name: 'Outdoor swimming pools'},
    {value: '555', name: 'Rvalueing stables'},
    {value: '557', name: 'Other outdoor sports'},
    {value: '560', name: 'Improved Beaches'},
    {value: '570', name: 'Marinas'},
    {value: '580', name: 'Camps,Camping Facilities and resorts'},
    {value: '581', name: 'camps'},
    {value: '582', name: 'Camping Facilities'},
    {value: '583', name: 'Resort complexes'},
    {value: '590', name: 'Parks'},
    {value: '591', name: 'playgrounds'},
    {value: '592', name: 'Athletic fields'},
    {value: '593', name: 'Picnic grounds'},
    {value: '600', name: 'Community Services'},
    {value: '610', name: 'Education'},
    {value: '611', name: 'Libraries'},
    {value: '612', name: 'Schools'},
    {value: '613', name: 'Colleges and Universities'},
    {value: '614', name: 'Special schools and institutions'},
    {value: '615', name: 'Other Educational facilities'},
    {value: '620', name: 'Religious'},
    {value: '630', name: 'Welfare'},
    {value: '631', name: 'Orphanage'},
    {value: '632', name: 'Benevolent and moral associations'},
    {value: '633', name: 'Home for the aged'},
    {value: '640', name: 'Health'},
    {value: '641', name: 'Hospitals'},
    {value: '642', name: 'All other health facilities'},
    {value: '650', name: 'Government'},
    {value: '651', name: 'Highway garage'},
    {value: '652', name: 'Office building'},
    {value: '653', name: 'Parking lots'},
    {value: '660', name: 'Protection'},
    {value: '661', name: 'Army,Navy,Air force, Marine and Coast Guard'},
    {value: '662', name: 'Police and fire protection,Electrical Signal'},
    {value: '670', name: 'Correctional'},
    {value: '680', name: 'Cultural and Recreational'},
    {value: '681', name: 'Cultural facilities'},
    {value: '682', name: 'Recreational facilities'},
    {value: '690', name: 'Miscellaneous'},
    {value: '691', name: 'Professional Associations'},
    {
        value: '692',
        name: 'Roads,Streets,Highways and parkways, Express or otherwise(if included) including adjoining land'
    },
    {value: '693', name: 'Indian Reservations'},
    {value: '694', name: 'Animal Welfare Shelters'},
    {value: '695', name: 'Cemeteries'},
    {value: '700', name: 'Industrial'},
    {value: '710', name: 'Manufacturing and Processing'},
    {value: '712', name: 'High tech. manufacturing and processing'},
    {value: '714', name: 'Light industrial manufacturing and processing'},
    {value: '715', name: 'Heavy Manufacturing and Processing'},
    {value: '720', name: 'Mining and Quarrying'},
    {value: '730', name: 'Wells'},
    {value: '731', name: 'Oil-Natural Flow(for production)'},
    {value: '732', name: 'Oil- Forced Flow(for production)'},
    {value: '733', name: 'Gas(for production)'},
    {value: '734', name: 'Junk'},
    {value: '735', name: 'Water used for oil production'},
    {value: '736', name: 'Gas or oil storage wells'},
    {value: '740', name: 'Industrial Product pipelines'},
    {value: '741', name: 'Gas'},
    {value: '742', name: 'Water'},
    {value: '743', name: 'Brine'},
    {value: '744', name: 'Petroleum products'},
    {value: '749', name: 'other'},
    {value: '800', name: 'Public services'},
    {value: '820', name: 'Water'},
    {value: '821', name: 'Flood control'},
    {value: '822', name: 'Water Supply'},
    {value: '823', name: 'Water treatment facilities'},
    {value: '826', name: 'Water transmission improvements'},
    {value: '827', name: 'Water transmission outsvaluee plant'},
    {value: '830', name: 'Communication'},
    {value: '831', name: 'Telephone'},
    {value: '832', name: 'Telegraph'},
    {value: '833', name: 'Radio'},
    {value: '834', name: 'Television other than Community Antenna television'},
    {value: '835', name: 'Community Antenna Television'},
    {value: '836', name: 'Telephone outsvaluee plant'},
    {value: '837', name: 'Cellular telephone towers'},
    {value: '840', name: 'Transportation'},
    {value: '841', name: 'Motor Vehicle'},
    {value: '842', name: 'Ceiling railroad'},
    {value: '843', name: 'Non ceiling railroad'},
    {value: '844', name: 'Air'},
    {value: '845', name: 'Water'},
    {value: '846', name: 'Brvalueges,tunnels and subways'},
    {value: '847', name: 'Pipelines'},
    {value: '850', name: 'Waste Disposal'},
    {value: '851', name: 'Solvalue waste'},
    {value: '852', name: 'Landfill and dumps'},
    {value: '853', name: 'Sewage treatment and water pollution control'},
    {value: '854', name: 'Air pollution control'},
    {value: '860', name: 'Special Franchise property'},
    {value: '861', name: 'Electric and gas'},
    {value: '862', name: 'Water'},
    {value: '866', name: 'Telephone'},
    {value: '867', name: 'Miscellaneous'},
    {value: '868', name: 'Pipelines'},
    {value: '869', name: 'Television'},
    {value: '870', name: 'Electric and Gas'},
    {value: '871', name: 'Electric and Gas facilities'},
    {value: '872', name: 'Electric sub station Electric power generation facilities'},
    {value: '873', name: 'Gas measuring and regulation station'},
    {value: '874', name: 'Electric Power generation Facility - Hydro'},
    {value: '875', name: 'Electric Power generation Facility - Fossil Fuel'},
    {value: '876', name: 'Electric Power generation Facility - Nuclear'},
    {value: '877', name: 'Electric Power generation Facility - Other fuel'},
    {value: '880', name: 'Electric and Gas Transmission and distribution'},
    {value: '882', name: 'Electric transmission improvement'},
    {value: '883', name: 'Gas transmission improvement'},
    {value: '884', name: 'Electric distribution-Outsvaluee plant property'},
    {value: '885', name: 'Gas distribution - Outsvaluee plant property'},
    {value: '900', name: 'Wild Forested Conservation lands and public parks'},
    {value: '910', name: 'Private Wild and Forest Lands except for Private Hunting and Fishing Clubs'},
    {value: '911', name: 'Forest Land Under Section 480 of the Real Property Tax Law'},
    {value: '912', name: 'Forest Land Under Section 480-a of the Real Property Tax Law'},
    {value: '920', name: 'Private Hunting and Fishing Clubs'},
    {value: '930', name: 'State Owned Forest Lands'},
    {
        value: '931',
        name: 'State Owned Land (Forest Preserve) in the Adirondack or Catskill Parks Taxable Under Section 532-a of the Real Property Tax Law'
    },
    {
        value: '932',
        name: 'State Owned Land Other Than Forest Preserve Covered Under Section 532-b, c, d, e, f, or g of the Real Property Tax Law'
    },
    {value: '940', name: 'Reforested Land and Other Related Conservation Purposes'},
    {value: '941', name: 'State Owned Reforested Land Taxable Under Sections 534 and 536 of the Real Property Tax Law'},
    {value: '942', name: 'County Owned Reforested Land'},
    {value: '950', name: 'Hudson River and Black River Regulating District Land'},
    {value: '960', name: 'Public Parks'},
    {value: '961', name: 'State Owned Public Parks, Recreation Areas, and Other Multiple Uses'},
    {value: '962', name: 'County Owned Public Parks and Recreation Areas'},
    {value: '963', name: 'City/Town/Village Public Parks and Recreation Areas'},
    {value: '970', name: 'Other Wild or Conservation Lands'},
    {
        value: '971',
        name: 'Wetlands, Either Privately or Governmentally Owned, Subject to Specific Restrictions as to Use'
    },
    {
        value: '972',
        name: 'Land Under Water, Either Privately or Governmentally Owned (other than resvalueential - more properly classified as value 315)'
    },
    {value: '980', name: 'Taxable State Owned Conservation Easements'},
    {value: '990', name: 'Other Taxable State Land Assessments'},
    {value: '991', name: 'Adirondack Park Aggregate Additional Assessments (Real Property Tax Law, Section 542(3))'},
    {
        value: '992',
        name: 'Hudson River-Black River Regulating District Aggregate Additional Assessments (Environmental Conservation Law, Section 15-2115)'
    },
    {value: '993', name: 'Transition Assessments for Taxable State Owned Land (Real Property Tax Law, Section 545)'},
    {value: '994', name: 'Transition Assessments for Exempt State Owned Land (Real Property Tax Law, Section 545)'}
];

export const agencyTypes = [
    {"value": 1, "name": "Division of Homeland Security"}, {"value": 2, "name": "Department Of State"}, {
        "value": 3,
        "name": "Dept of Environ Conservtion"
    }, {"value": 4, "name": "Off of Children & Family Serv"}, {
        "value": 5,
        "name": "Division of State Police"
    }, {"value": 6, "name": "Office of Mental Health"}, {
        "value": 7,
        "name": "Ofc for People w/ Disabilities"
    }, {"value": 8, "name": "Suny Central Admin"}, {"value": 9, "name": "Department of Labor"}, {
        "value": 10,
        "name": "Office of General Services"
    }, {"value": 11, "name": "Department of Health"}, {
        "value": 12,
        "name": "Off of Alchl & Substance Abuse"
    }, {"value": 13, "name": "Department of State"}, {"value": 14, "name": "Unified Court System"}, {
        "value": 15,
        "name": "Department of Transportation"
    }, {"value": 16, "name": "Off Of General Services"}, {
        "value": 17,
        "name": "Div Military & Naval Affairs"
    }, {"value": 18, "name": "State Education Department"}, {
        "value": 19,
        "name": "Off of Parks, Rec & Hstrc Pres"
    }, {"value": 20, "name": "State University of New York"}, {
        "value": 21,
        "name": "Adirondack Park Agency"
    }, {"value": 22, "name": "AGRICULTURE & MARKETS"}, {
        "value": 23,
        "name": "Off of Addict Srvcs & Supports"
    }, {"value": 24, "name": "Dept of Corrctns_Cmmnty Sprvsn"}
]

export const criticalTypes = [
    {
        "value": "70100",
        "name": "Agriculture or Livestock Structure"
    },
    {
        "value": "70101",
        "name": "Agriculture Experimental Station"
    },
    {
        "value": "70102",
        "name": "Food Industry Facility"
    },
    {
        "value": "70103",
        "name": "Bakery (Regional)"
    },
    {
        "value": "70104",
        "name": "Beverage Bottling Plant"
    },
    {
        "value": "70106",
        "name": "Brewery / Distillery / Winery"
    },
    {
        "value": "70108",
        "name": "Cannery"
    },
    {
        "value": "70110",
        "name": "Corral"
    },
    {
        "value": "70112",
        "name": "Dairy"
    },
    {
        "value": "70114",
        "name": "Farm / Ranch"
    },
    {
        "value": "70116",
        "name": "Feedlot"
    },
    {
        "value": "70118",
        "name": "Food Distribution Center"
    },
    {
        "value": "70120",
        "name": "Fish Farm / Hatchery"
    },
    {
        "value": "70121",
        "name": "Fish Ladder"
    },
    {
        "value": "70122",
        "name": "Grain Elevator"
    },
    {
        "value": "70124",
        "name": "Grain Mill"
    },
    {
        "value": "70126",
        "name": "Greenhouse / Nursery"
    },
    {
        "value": "70128",
        "name": "Livestock Complex"
    },
    {
        "value": "70132",
        "name": "Meat Processing / Pkg Facility"
    },
    {
        "value": "70134",
        "name": "Stockyard / Feedlot"
    },
    {
        "value": "70136",
        "name": "Veternary Hospital / Clinic"
    },
    {
        "value": "71000",
        "name": "Industrial Facility"
    },
    {
        "value": "71001",
        "name": "Chemical Facility"
    },
    {
        "value": "71002",
        "name": "Manufacturing Facility"
    },
    {
        "value": "71004",
        "name": "Aircraft Manufacturing Facility"
    },
    {
        "value": "71006",
        "name": "Armament Manufacturing Facility"
    },
    {
        "value": "71008",
        "name": "Automotive Mftg Facility"
    },
    {
        "value": "71010",
        "name": "Durable / Non-Durable Goods"
    },
    {
        "value": "71012",
        "name": "Explosives Facility"
    },
    {
        "value": "71014",
        "name": "Fertilizer Facility"
    },
    {
        "value": "71016",
        "name": "Hazardous Materials Facility"
    },
    {
        "value": "71018",
        "name": "Hazardous Waste Facility"
    },
    {
        "value": "71020",
        "name": "Household Products Facility"
    },
    {
        "value": "71022",
        "name": "Landfill"
    },
    {
        "value": "71024",
        "name": "Lumber Mill / Saw Mill"
    },
    {
        "value": "71026",
        "name": "Maintenance Yard"
    },
    {
        "value": "71028",
        "name": "Manufacturing Warehouse"
    },
    {
        "value": "71030",
        "name": "Mine"
    },
    {
        "value": "71032",
        "name": "Mine Waste Disposal Site"
    },
    {
        "value": "71034",
        "name": "Mine Uranium Facility"
    },
    {
        "value": "71036",
        "name": "Nuclear Weapons Facility"
    },
    {
        "value": "71038",
        "name": "Ore Processing Facility"
    },
    {
        "value": "71040",
        "name": "Paper / Pulp Mill"
    },
    {
        "value": "71042",
        "name": "Pharmaceutical Plant"
    },
    {
        "value": "71044",
        "name": "Semiconductor & Microchip Flty"
    },
    {
        "value": "71046",
        "name": "Shipyard"
    },
    {
        "value": "71048",
        "name": "Steel Plant"
    },
    {
        "value": "71050",
        "name": "Superfund Site"
    },
    {
        "value": "71052",
        "name": "Textile Plant"
    },
    {
        "value": "72000",
        "name": "Commercial or Retail Facility"
    },
    {
        "value": "72002",
        "name": "Corporate Headquarters"
    },
    {
        "value": "72004",
        "name": "Gas Station"
    },
    {
        "value": "72006",
        "name": "Grocery Store"
    },
    {
        "value": "72008",
        "name": "Hotel / Motel"
    },
    {
        "value": "72010",
        "name": "Shopping Mall / Complex"
    },
    {
        "value": "72012",
        "name": "Warehouse (Retail / Wholesale)"
    },
    {
        "value": "73000",
        "name": "Education Facility"
    },
    {
        "value": "73002",
        "name": "School"
    },
    {
        "value": "73004",
        "name": "College / University"
    },
    {
        "value": "74000",
        "name": "Emergency Response / Law Enfmt Flty"
    },
    {
        "value": "74001",
        "name": "Ambulence Service"
    },
    {
        "value": "74002",
        "name": "American Red Cross Facility"
    },
    {
        "value": "74004",
        "name": "Forder Patrol"
    },
    {
        "value": "74006",
        "name": "Bur.of Alchohol, Tobacco, and Firearms"
    },
    {
        "value": "74008",
        "name": "Civil Defense"
    },
    {
        "value": "74010",
        "name": "Coast Guard"
    },
    {
        "value": "74012",
        "name": "Customs Service"
    },
    {
        "value": "74014",
        "name": "Department of Justice"
    },
    {
        "value": "74016",
        "name": "Drug Enforcement Agency"
    },
    {
        "value": "74018",
        "name": "Federal Bureau of Investigation"
    },
    {
        "value": "74020",
        "name": "Federal Emergency Mgmt Agency"
    },
    {
        "value": "74022",
        "name": "Fire Equipment Manufacturer"
    },
    {
        "value": "74024",
        "name": "Fire Hydrant"
    },
    {
        "value": "74026",
        "name": "Fire Station / EMS Station"
    },
    {
        "value": "74028",
        "name": "Fire Training Facility / Academy"
    },
    {
        "value": "74030",
        "name": "Immigration and Naturalization Service"
    },
    {
        "value": "74032",
        "name": "Marshal Service"
    },
    {
        "value": "74034",
        "name": "Law Enforcement"
    },
    {
        "value": "74036",
        "name": "Prison / Correctional Facility"
    },
    {
        "value": "74038",
        "name": "Search and Rescue Office"
    },
    {
        "value": "74040",
        "name": "Secret Service"
    },
    {
        "value": "74042",
        "name": "Transportation Safety Board"
    },
    {
        "value": "74044",
        "name": "Office of Emergency Management"
    },
    {
        "value": "75000",
        "name": "Energy Facility"
    },
    {
        "value": "75002",
        "name": "Energy Distribution Control Flty"
    },
    {
        "value": "75004",
        "name": "Natural Gas Facility"
    },
    {
        "value": "75006",
        "name": "Nuclear Fuel Plant"
    },
    {
        "value": "75008",
        "name": "Nuclear Research Facility"
    },
    {
        "value": "75009",
        "name": "Nuclear Waste Processing / Strg Flty"
    },
    {
        "value": "75010",
        "name": "Nuclear Weapons Plant"
    },
    {
        "value": "75012",
        "name": "Oil / Gas Facility"
    },
    {
        "value": "75014",
        "name": "Oil / Gas Well of Field"
    },
    {
        "value": "75016",
        "name": "Oil / Gas Extract. or Injection Well"
    },
    {
        "value": "75018",
        "name": "Oil / Gas Pumping Station"
    },
    {
        "value": "75020",
        "name": "Oil / Gas Refinery"
    },
    {
        "value": "75022",
        "name": "Oil / Gas Processing Plant"
    },
    {
        "value": "75024",
        "name": "Oil / Gas Storage Flty / Tank Farm"
    },
    {
        "value": "75026",
        "name": "POL Storage Tank"
    },
    {
        "value": "75028",
        "name": "Strategic Petroleum Reserve"
    },
    {
        "value": "75030",
        "name": "Electric Facility"
    },
    {
        "value": "75032",
        "name": "Hydroelectric Facility"
    },
    {
        "value": "75034",
        "name": "Nuclear Facility"
    },
    {
        "value": "75036",
        "name": "Solar Facility"
    },
    {
        "value": "75038",
        "name": "Substation"
    },
    {
        "value": "75039",
        "name": "Coal Facility"
    },
    {
        "value": "75040",
        "name": "Wind Facility"
    },
    {
        "value": "75041",
        "name": "Waste / Biomass Facility"
    },
    {
        "value": "75042",
        "name": "Tidal Facility"
    },
    {
        "value": "75043",
        "name": "Geothermal Facility"
    },
    {
        "value": "76000",
        "name": "Banking or Finance Facility"
    },
    {
        "value": "76004",
        "name": "Bank"
    },
    {
        "value": "76006",
        "name": "Bullion Repository"
    },
    {
        "value": "76008",
        "name": "Check Clearing Center"
    },
    {
        "value": "76010",
        "name": "Commodities Exchange"
    },
    {
        "value": "76012",
        "name": "Federal Reserve Bank / Branch"
    },
    {
        "value": "76014",
        "name": "Financial Processing Center"
    },
    {
        "value": "76016",
        "name": "Financial Services Company"
    },
    {
        "value": "76018",
        "name": "Investment / Brokerage Center"
    },
    {
        "value": "76020",
        "name": "Insurance and Finance Center"
    },
    {
        "value": "76022",
        "name": "Stock Exchange"
    },
    {
        "value": "76024",
        "name": "U.S. Mint / Bur. of Engraving & Pringing"
    },
    {
        "value": "78000",
        "name": "Mail or Shipping Facility"
    },
    {
        "value": "78002",
        "name": "Air Shipping Hub"
    },
    {
        "value": "78004",
        "name": "Bulk Mail Center"
    },
    {
        "value": "78006",
        "name": "Post Office"
    },
    {
        "value": "78008",
        "name": "Pvte and Express Shipping Flty"
    },
    {
        "value": "79000",
        "name": "Building General"
    },
    {
        "value": "79002",
        "name": "Mobile Home Park"
    },
    {
        "value": "79004",
        "name": "Multi-Family Dwelling"
    },
    {
        "value": "79006",
        "name": "Single-Family Dwelling"
    },
    {
        "value": "79008",
        "name": "Institutional Residence / Dorm / Barracks"
    },
    {
        "value": "80000",
        "name": "Health or Medical Facility"
    },
    {
        "value": "80002",
        "name": "Blood Bank"
    },
    {
        "value": "80004",
        "name": "Center for Disease Control Office"
    },
    {
        "value": "80006",
        "name": "Day Care Facility"
    },
    {
        "value": "80008",
        "name": "Diagnostic Laboratory"
    },
    {
        "value": "80010",
        "name": "Homeless Shelter"
    },
    {
        "value": "80012",
        "name": "Hospital / Medical Center"
    },
    {
        "value": "80014",
        "name": "Medical Research laboratory"
    },
    {
        "value": "80016",
        "name": "Medical Stockpile Facility"
    },
    {
        "value": "80018",
        "name": "Morgue"
    },
    {
        "value": "80020",
        "name": "Mortuary / Crematory"
    },
    {
        "value": "80022",
        "name": "Nursing Home / Long Term Care"
    },
    {
        "value": "80024",
        "name": "Outpatient Clinic"
    },
    {
        "value": "80026",
        "name": "Pharmacy"
    },
    {
        "value": "80028",
        "name": "Public Health Office"
    },
    {
        "value": "80030",
        "name": "Rehabilitation Center"
    },
    {
        "value": "81000",
        "name": "Transportation Facility"
    },
    {
        "value": "81006",
        "name": "AIrport Terminal"
    },
    {
        "value": "81008",
        "name": "AIr Support/Maintence Facility"
    },
    {
        "value": "81010",
        "name": "Air Traffice Control Center/COmmand Center"
    },
    {
        "value": "81011",
        "name": "Boat Ramp/Dock"
    },
    {
        "value": "81012",
        "name": "Bridge"
    },
    {
        "value": "81014",
        "name": "Bridge: Light Rail/Subway"
    },
    {
        "value": "81016",
        "name": "Bridge:Railroad"
    },
    {
        "value": "81018",
        "name": "Bridge:Road"
    },
    {
        "value": "81020",
        "name": "Border Crossing/Port of Entry"
    },
    {
        "value": "81022",
        "name": "Bus Station /Dispatch FacilityIndustrial Facility"
    },
    {
        "value": "81024",
        "name": "Ferry Terminal/Dispatch Facility"
    },
    {
        "value": "81025",
        "name": "Harbor/Marina"
    },
    {
        "value": "81026",
        "name": "Hellpad/Heliport/Helispot"
    },
    {
        "value": "81028",
        "name": "Launch Facility"
    },
    {
        "value": "81030",
        "name": "Launch Pad"
    },
    {
        "value": "81032",
        "name": "Light Rail Power Substation"
    },
    {
        "value": "81034",
        "name": "Light Rail Station"
    },
    {
        "value": "81036",
        "name": "Park and Ride /Commuter Lot"
    },
    {
        "value": "81038",
        "name": "Parking Lot Structure/Garage"
    },
    {
        "value": "81040",
        "name": "Pier/Wharf/Quay/Mole"
    },
    {
        "value": "81042",
        "name": "Port Facility"
    },
    {
        "value": "81044",
        "name": "Port Facility:Commercial Port"
    },
    {
        "value": "81046",
        "name": "Port Facility:Crane"
    },
    {
        "value": "81048",
        "name": "Port Facility:Maintenance and Fuel Facility"
    },
    {
        "value": "81050",
        "name": "Port Facility:Modal Transfter Facility"
    },
    {
        "value": "81052",
        "name": "Port Facility:Passenger Terminal"
    },
    {
        "value": "81054",
        "name": "Port Facility:Warehouse Storage/Container Yd"
    },
    {
        "value": "81056",
        "name": "Railroad Facility"
    },
    {
        "value": "81058",
        "name": "RailroadCommand/Control Facility"
    },
    {
        "value": "81060",
        "name": "Railroad Freight Loading Facility"
    },
    {
        "value": "81062",
        "name": "Railroad Maintence /Fuel Facility"
    },
    {
        "value": "81064",
        "name": "railroad Roundhouse/Turntable"
    },
    {
        "value": "81066",
        "name": "Railroad Station"
    },
    {
        "value": "81068",
        "name": "Railroad yard"
    },
    {
        "value": "81070",
        "name": "Rest Stop/Roadside Park"
    },
    {
        "value": "81072",
        "name": "Seaplane Anchorage /Base"
    },
    {
        "value": "81073",
        "name": "Snowshed"
    },
    {
        "value": "81074",
        "name": "Subway Station"
    },
    {
        "value": "81076",
        "name": "Toll Booth/Plaza"
    },
    {
        "value": "81078",
        "name": "Truck Stop"
    },
    {
        "value": "81080",
        "name": "Tunnel"
    },
    {
        "value": "81082",
        "name": "Tunnel: Light Rail/Subway"
    },
    {
        "value": "81084",
        "name": "Tunnel:Road"
    },
    {
        "value": "81086",
        "name": "Tunnel:Railroad"
    },
    {
        "value": "81088",
        "name": "Weigh Station /Inspection Station"
    },
    {
        "value": "82000",
        "name": "Public Attraction/Landmark Bldg"
    },
    {
        "value": "82002",
        "name": "Amusement / Water Park"
    },
    {
        "value": "82004",
        "name": "Arboretem / Botanical Garden"
    },
    {
        "value": "82006",
        "name": "Auditorium/Theater"
    },
    {
        "value": "82008",
        "name": "Campground"
    },
    {
        "value": "82010",
        "name": "Cemetary"
    },
    {
        "value": "82011",
        "name": "Community / Recreation Center"
    },
    {
        "value": "82012",
        "name": "Convention Center"
    },
    {
        "value": "82014",
        "name": "Fair / Exhibition / Rodeo Grounds"
    },
    {
        "value": "82016",
        "name": "Gold Course"
    },
    {
        "value": "82018",
        "name": "Historic Site / Point of Interest"
    },
    {
        "value": "82020",
        "name": "Houe of Worship"
    },
    {
        "value": "82022",
        "name": "Ice Arena"
    },
    {
        "value": "82024",
        "name": "Library"
    },
    {
        "value": "82026",
        "name": "Lighthouse / Light"
    },
    {
        "value": "82028",
        "name": "Lockout Tower"
    },
    {
        "value": "82030",
        "name": "Marina"
    },
    {
        "value": "82032",
        "name": "Museum"
    },
    {
        "value": "82034",
        "name": "National Symbol / Monument"
    },
    {
        "value": "82036",
        "name": "Observatory"
    },
    {
        "value": "82038",
        "name": "Outdoor Theater / Amphitheater"
    },
    {
        "value": "82040",
        "name": "Picnic Area"
    },
    {
        "value": "82042",
        "name": "Racetrack / Dragstrip"
    },
    {
        "value": "82044",
        "name": "Ski Area / Ski Resort"
    },
    {
        "value": "82046",
        "name": "Sports Arena / Stadium"
    },
    {
        "value": "82047",
        "name": "Trailhead"
    },
    {
        "value": "82048",
        "name": "Visitor / Information Center"
    },
    {
        "value": "82050",
        "name": "Zoo"
    },
    {
        "value": "83000",
        "name": "Government of Military Facility"
    },
    {
        "value": "83002",
        "name": "Bureau of Land Mgmt Facility"
    },
    {
        "value": "83004",
        "name": "US Capitol"
    },
    {
        "value": "83006",
        "name": "State Capitol"
    },
    {
        "value": "83008",
        "name": "US Supreme Court"
    },
    {
        "value": "83010",
        "name": "State Supreme Court"
    },
    {
        "value": "83011",
        "name": "Court House"
    },
    {
        "value": "83012",
        "name": "Critical Federal Contractor Flty"
    },
    {
        "value": "83014",
        "name": "Department of Energy Facility"
    },
    {
        "value": "83016",
        "name": "Department of State Facility"
    },
    {
        "value": "83018",
        "name": "Dept of Motor Vehicle Facility"
    },
    {
        "value": "83020",
        "name": "DoD / Military Facility"
    },
    {
        "value": "83022",
        "name": "Governor Residence"
    },
    {
        "value": "83024",
        "name": "Intelligence Facility"
    },
    {
        "value": "83026",
        "name": "Local Government Facility"
    },
    {
        "value": "83028",
        "name": "NASA Facility"
    },
    {
        "value": "83030",
        "name": "National Guard Armory / Base"
    },
    {
        "value": "83032",
        "name": "National Park Service Facility"
    },
    {
        "value": "83034",
        "name": "State Government Facility"
    },
    {
        "value": "83036",
        "name": "Tribal Government Facility"
    },
    {
        "value": "83038",
        "name": "US Forest Service Facility"
    },
    {
        "value": "83040",
        "name": "Us Government Facility"
    },
    {
        "value": "83042",
        "name": "White House"
    },
    {
        "value": "83043",
        "name": "Department of Public Works"
    },
    {
        "value": "83044",
        "name": "City / Town Hall"
    },
    {
        "value": "84000",
        "name": "Weather Facility or Structure"
    },
    {
        "value": "84002",
        "name": "Warning Center"
    },
    {
        "value": "84004",
        "name": "Weather Data Center"
    },
    {
        "value": "84006",
        "name": "Weather Forecast Office"
    },
    {
        "value": "84008",
        "name": "Weather Radar Site"
    },
    {
        "value": "85000",
        "name": "Water Supply or Teratment Facility"
    },
    {
        "value": "85001",
        "name": "Portable Water Facility"
    },
    {
        "value": "85002",
        "name": "Public Water Supply Intake"
    },
    {
        "value": "85004",
        "name": "Public Water Supply Well"
    },
    {
        "value": "85006",
        "name": "Wastewater Treatment Plant"
    },
    {
        "value": "85008",
        "name": "Water Pumping Station"
    },
    {
        "value": "85010",
        "name": "Water System Control Facility"
    },
    {
        "value": "85012",
        "name": "Water Tank"
    },
    {
        "value": "85014",
        "name": "Water Tower"
    },
    {
        "value": "85016",
        "name": "Water Treatment Facility"
    },
    {
        "value": "88000",
        "name": "Information/Communication Flty"
    },
    {
        "value": "88002",
        "name": "Communication Tower"
    },
    {
        "value": "88004",
        "name": "Data Center"
    },
    {
        "value": "88006",
        "name": "Internet DNS Location"
    },
    {
        "value": "88008",
        "name": "Internet Metro Area Exchge / Hub"
    },
    {
        "value": "88010",
        "name": "Internet Service Provider"
    },
    {
        "value": "88012",
        "name": "Radio / TV Broadcast Facility"
    },
    {
        "value": "88014",
        "name": "Satellite Ground Station"
    },
    {
        "value": "88016",
        "name": "Telephone Facility"
    }
]
export default {
    'Owner Type': ownerTypes,
    'Land Use Type': propTypes,
    'Agency': agencyTypes,
    'Critical': criticalTypes,
    getName: (obj = [], val) => (obj.find(o => o.value === val) || {}).name,
    getValue: (obj = [], name) => (obj.find(o => o.name === name) || {}).value,
    getNames: (obj = []) => obj.map(o => o.name),
    getValues: (obj = []) => obj.map(o => o.value),

}