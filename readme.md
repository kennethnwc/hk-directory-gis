### Production site 
https://hkh-gis.lib.hku.hk

### For the fetching data part
you can go to https://hkh-gis.lib.hku.hk/api/<the path called in frontend>


### drawing over 15k addresses and doing filtering to update the data

### How to run
```bash
yarn
yarn dev
```

### It is quite messy on the zustand store implementation, for example, I cannot get the type definition working, so I end up adding ! in the return store. If you have better apporach, please let me know. Thanks in advance.  