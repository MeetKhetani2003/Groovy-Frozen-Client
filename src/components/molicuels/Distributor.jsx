import { toast } from '@/hooks/use-toast';
import { useDistributor } from '@/zustand/apis/distributorState';

const InputData = ({ label, onChange, type, placeholder, name, value }) => {
  return (
    <div className='mb-4'>
      <label className='block text-sm font-medium text-gray-700 mb-1'>
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500'
      />
    </div>
  );
};

const Distributor = () => {
  const { distributor, setDistributor } = useDistributor();

  const handleSubmit = (event) => {
    event.preventDefault();
    toast({
      title: 'Application Submitted Successfully',
    });
    console.log('Distributor Data:', distributor);
  };

  return (
    <div className='p-4 bg-white rounded-md'>
      <h1 className='text-lg font-semibold text-center mb-4'>
        Distributor Application
      </h1>
      <form onSubmit={handleSubmit}>
        <InputData
          label='Name'
          type='text'
          placeholder='Enter your name'
          name='name'
          value={distributor.name}
          onChange={(e) => setDistributor({ name: e.target.value })}
        />
        <InputData
          label='Mobile No'
          type='tel'
          placeholder='Enter your mobile number'
          name='mobileNo'
          value={distributor.mobileNo}
          onChange={(e) => setDistributor({ mobileNo: e.target.value })}
        />
        <InputData
          label='Email'
          type='email'
          placeholder='Enter your email'
          name='email'
          value={distributor.email}
          onChange={(e) => setDistributor({ email: e.target.value })}
        />
        <InputData
          label='Address'
          type='text'
          placeholder='Enter your address'
          name='address'
          value={distributor.address}
          onChange={(e) => setDistributor({ address: e.target.value })}
        />
        <div className='mb-3'>
          <label className='block text-sm text-gray-700 mb-1'>Message</label>
          <textarea
            name='message'
            placeholder='Enter your message'
            value={distributor.message}
            onChange={(e) => setDistributor({ message: e.target.value })}
            className='block w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:ring-green-500'
            rows='3'
          ></textarea>
        </div>
        <button
          type='submit'
          className='w-full py-2 text-white bg-green-600 rounded hover:bg-green-700'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Distributor;
